import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { deletePartner, updatePartner } from "@/lib/partners-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const { id } = await params;
    const partner = await updatePartner(id, await request.json());
    return NextResponse.json({ partner });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update the partner." },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const { id } = await params;
    await deletePartner(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete the partner." },
      { status: 400 },
    );
  }
}
