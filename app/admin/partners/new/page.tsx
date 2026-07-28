import { PartnerForm } from "@/components/PartnerForm";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewPartnerPage() {
  await requireAdmin();
  return (
    <main className="admin-shell form-shell">
      <header className="admin-header compact-admin-header">
        <div>
          <p className="eyebrow">New establishment</p>
          <h1>Add a partner benefit</h1>
          <p>Complete the confirmed partner details. You may save it as a draft before publishing.</p>
        </div>
      </header>
      <PartnerForm />
    </main>
  );
}
