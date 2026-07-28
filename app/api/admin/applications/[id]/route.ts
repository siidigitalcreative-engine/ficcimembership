import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { updatePartnerApplicationReview } from "@/lib/partner-applications-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const application = await updatePartnerApplicationReview(
      id,
      await request.json(),
    );
    return NextResponse.json({ application });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update the partner application.",
      },
      { status: 400 },
    );
  }
}
