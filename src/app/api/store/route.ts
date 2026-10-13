import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import defaultStoreData from "@/data/store-data.json";

const LOCAL_FILE_PATH = path.join(process.cwd(), "src", "data", "store-data.json");
const TMP_FILE_PATH = "/tmp/peakvitals-store-data.json";
const GITHUB_REPO = process.env.GITHUB_REPO || "Sudhanshu7393/peakvitals-nutrition";
const GITHUB_FILE_PATH = "src/data/store-data.json";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Peakvitals@2026";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Check /tmp cache first (for instant serverless updates)
    if (fs.existsSync(TMP_FILE_PATH)) {
      const tmpRaw = fs.readFileSync(TMP_FILE_PATH, "utf-8");
      const tmpJson = JSON.parse(tmpRaw);
      if (tmpJson && Array.isArray(tmpJson.products)) {
        return NextResponse.json(tmpJson, {
          headers: { "Cache-Control": "no-store, max-age=0" },
        });
      }
    }

    // 2. Check local project file
    if (fs.existsSync(LOCAL_FILE_PATH)) {
      const localRaw = fs.readFileSync(LOCAL_FILE_PATH, "utf-8");
      const localJson = JSON.parse(localRaw);
      if (localJson && Array.isArray(localJson.products)) {
        return NextResponse.json(localJson, {
          headers: { "Cache-Control": "no-store, max-age=0" },
        });
      }
    }

    // 3. Fallback to bundled JSON
    return NextResponse.json(defaultStoreData, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (err) {
    console.error("GET /api/store error:", err);
    return NextResponse.json(defaultStoreData, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, storeData, githubToken, action } = body;

    // Action: verify password only
    if (action === "login") {
      if (password === DEFAULT_ADMIN_PASSWORD) {
        return NextResponse.json({ ok: true, message: "Login successful" });
      }
      return NextResponse.json(
        { ok: false, error: "Invalid Admin Password" },
        { status: 401 }
      );
    }

    // Verify password for saving
    if (password !== DEFAULT_ADMIN_PASSWORD) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized: Incorrect Admin Password" },
        { status: 401 }
      );
    }

    if (!storeData || !Array.isArray(storeData.products)) {
      return NextResponse.json(
        { ok: false, error: "Invalid store data payload" },
        { status: 400 }
      );
    }

    const updatedPayload = {
      ...storeData,
      updatedAt: new Date().toISOString(),
    };
    const jsonString = JSON.stringify(updatedPayload, null, 2);

    let savedLocal = false;
    let savedTmp = false;
    let savedGithub = false;
    let githubError = "";

    // 1. Try writing to local src/data/store-data.json (works on local dev / VPS)
    try {
      fs.writeFileSync(LOCAL_FILE_PATH, jsonString, "utf-8");
      savedLocal = true;
    } catch {
      // Read-only filesystem on Vercel serverless
    }

    // 2. Try writing to /tmp (works on Vercel serverless for warm instances)
    try {
      fs.writeFileSync(TMP_FILE_PATH, jsonString, "utf-8");
      savedTmp = true;
    } catch {
      // Ignore if /tmp not available
    }

    // 3. If GitHub token is provided (via Admin UI or process.env.GITHUB_TOKEN), commit directly to GitHub repo!
    const tokenToUse = (githubToken || process.env.GITHUB_TOKEN || "").trim();
    if (tokenToUse) {
      try {
        const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;
        const getRes = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${tokenToUse}`,
            Accept: "application/vnd.github+json",
          },
          cache: "no-store",
        });

        let sha: string | undefined;
        if (getRes.ok) {
          const fileMeta = await getRes.json();
          sha = fileMeta.sha;
        }

        const putRes = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${tokenToUse}`,
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "chore(admin): update store catalog & pricing via Peakvitals Admin Panel",
            content: Buffer.from(jsonString, "utf-8").toString("base64"),
            ...(sha ? { sha } : {}),
          }),
        });

        if (putRes.ok) {
          savedGithub = true;
        } else {
          const errText = await putRes.text();
          githubError = `GitHub API (${putRes.status}): ${errText.slice(0, 120)}`;
        }
      } catch (e: unknown) {
        githubError = e instanceof Error ? e.message : "GitHub sync failed";
      }
    }

    return NextResponse.json({
      ok: true,
      savedLocal,
      savedTmp,
      savedGithub,
      githubError,
      storeData: updatedPayload,
    });
  } catch (err: unknown) {
    console.error("POST /api/store error:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
