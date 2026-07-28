import { PartnerDirectoryClient } from "@/components/PartnerDirectoryClient";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPublishedPartners } from "@/lib/partners-store";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const partners = await getPublishedPartners();

  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Benefits directory</p>
          <h1>Participating establishments</h1>
          <p>Search approved partner discounts, privileges, branches, online links, and redemption conditions.</p>
          <div className="button-row no-print page-hero-actions">
            <a className="button button-primary" href={siteConfig.glueUpProgramUrl} target="_blank" rel="noreferrer">Apply as a Benefit Partner</a>
            <a className="button button-secondary" href={siteConfig.myGlueDownloadUrl} target="_blank" rel="noreferrer">Download My Glue</a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {partners.length ? (
            <PartnerDirectoryClient partners={partners} />
          ) : (
            <div className="empty-state">
              <h2>No establishments have been published yet.</h2>
              <p>The FICCI team can add and publish partner establishments through the admin area.</p>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
