import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { createPartner, getPartners } from "@/lib/partners-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json({ partners: await getPartners() });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const partner = await createPartner(await request.json());
    return NextResponse.json({ partner }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to add the partner." },
      { status: 400 },
    );
  }
}
