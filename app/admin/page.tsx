import Link from "next/link";
import { DeletePartnerButton } from "@/components/DeletePartnerButton";
import { LogoutButton } from "@/components/LogoutButton";
import { requireAdmin } from "@/lib/auth";
import { getPartners } from "@/lib/partners-store";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const partners = await getPartners();
  const published = partners.filter((partner) => partner.published).length;
  const featured = partners.filter((partner) => partner.featured).length;
  const drafts = partners.length - published;

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="eyebrow">FICCI Benefits Admin</p>
          <h1>Partner establishments</h1>
          <p>Add and manage physical or online establishments, benefits, branches, promo codes, and validity.</p>
        </div>
        <div className="admin-header-actions">
          <Link className="button button-secondary button-small" href="/" target="_blank">View public site</Link>
          <LogoutButton />
        </div>
      </header>

      <section className="admin-stats">
        <article><span>Total partners</span><strong>{partners.length}</strong></article>
        <article><span>Published</span><strong>{published}</strong></article>
        <article><span>Drafts</span><strong>{drafts}</strong></article>
        <article><span>Featured</span><strong>{featured}</strong></article>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="eyebrow">Directory management</p>
            <h2>All establishments</h2>
          </div>
          <Link className="button button-primary" href="/admin/partners/new">+ Add partner establishment</Link>
        </div>

        {partners.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Establishment</th>
                  <th>Offer</th>
                  <th>Validity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner) => (
                  <tr key={partner.id}>
                    <td>
                      <strong>{partner.name}</strong>
                      <small>{partner.category} · {partner.redemptionType}</small>
                    </td>
                    <td>
                      <strong>{partner.discountLabel || partner.offerTitle}</strong>
                      {partner.promoCode ? <small>Code: {partner.promoCode}</small> : <small>No promo code</small>}
                    </td>
                    <td>
                      <span>{formatDate(partner.startDate)}</span>
                      <small>to {formatDate(partner.endDate)}</small>
                    </td>
                    <td>
                      <div className="status-stack">
                        <span className={partner.published ? "status-active" : "status-draft"}>{partner.published ? "Published" : "Draft"}</span>
                        {partner.featured ? <span className="featured-mini">Featured</span> : null}
                      </div>
                    </td>
                    <td>
                      <div className="table-actions">
                        {partner.published ? <Link className="button button-secondary button-small" href={`/partners/${partner.slug}`} target="_blank">View</Link> : null}
                        <Link className="button button-secondary button-small" href={`/admin/partners/${partner.id}/edit`}>Edit</Link>
                        <DeletePartnerButton id={partner.id} name={partner.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state admin-empty">
            <h2>No partner establishments yet.</h2>
            <p>Add the first approved business and publish it when all details are confirmed.</p>
            <Link className="button button-primary" href="/admin/partners/new">Add the first partner</Link>
          </div>
        )}
      </section>
    </main>
  );
}
