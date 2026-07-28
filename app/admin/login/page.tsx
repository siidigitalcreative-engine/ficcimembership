import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { isAdminAuthenticated } from "@/lib/auth";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");

  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="brand-mark auth-brand" aria-hidden="true">F</span>
        <p className="eyebrow">Secure admin</p>
        <h1>{siteConfig.programName}</h1>
        <p>Sign in to add, edit, publish, feature, or remove partner establishments and their offers.</p>
        <AdminLoginForm />
        <a className="back-link" href="/">← Return to public website</a>
      </div>
    </main>
  );
}
