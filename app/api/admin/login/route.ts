import { NextResponse } from "next/server";
import { adminCookie, createSessionToken, isValidAdminPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    if (!body.password || !isValidAdminPassword(body.password)) {
      return NextResponse.json({ error: "Incorrect admin password." }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(adminCookie.name, createSessionToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: adminCookie.maxAge,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to sign in." },
      { status: 500 },
    );
  }
}
