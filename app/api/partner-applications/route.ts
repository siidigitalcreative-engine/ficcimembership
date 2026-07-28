import { NextResponse } from "next/server";
import { createPartnerApplication } from "@/lib/partner-applications-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 250_000) {
      return NextResponse.json(
        { error: "The submitted form is too large." },
        { status: 413 },
      );
    }

    const payload = (await request.json()) as Record<string, unknown>;

    // Hidden field used to discourage automated spam submissions.
    if (typeof payload.companyWebsite === "string" && payload.companyWebsite) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const application = await createPartnerApplication(payload);
    return NextResponse.json(
      {
        success: true,
        referenceNumber: application.referenceNumber,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to submit the partner application.",
      },
      { status: 400 },
    );
  }
}
