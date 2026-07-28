import { notFound } from "next/navigation";
import { PartnerForm } from "@/components/PartnerForm";
import { requireAdmin } from "@/lib/auth";
import { getPartnerById } from "@/lib/partners-store";

export const dynamic = "force-dynamic";

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const partner = await getPartnerById(id);
  if (!partner) notFound();

  return (
    <main className="admin-shell form-shell">
      <header className="admin-header compact-admin-header">
        <div>
          <p className="eyebrow">Edit establishment</p>
          <h1>{partner.name}</h1>
          <p>Update the benefit details, validity, links, branches, and publishing status.</p>
        </div>
      </header>
      <PartnerForm partner={partner} />
    </main>
  );
}
