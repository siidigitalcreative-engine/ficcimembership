import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { formatDate, isOfferActive } from "@/lib/format";
import { getPartnerBySlug } from "@/lib/partners-store";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default async function PartnerDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const partner = await getPartnerBySlug(slug);
  if (!partner) notFound();
  const active = isOfferActive(partner);

  return (
    <main>
      <SiteHeader />
      <section className="partner-detail-hero">
        {partner.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="partner-detail-cover" src={partner.coverImageUrl} alt={`${partner.name} cover`} />
        ) : null}
        <div className="container partner-detail-title">
          <Link className="back-link no-print" href="/partners">← Back to directory</Link>
          <div className="partner-title-row">
            {partner.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="partner-logo" src={partner.logoUrl} alt={`${partner.name} logo`} />
            ) : (
              <span className="partner-logo-placeholder">{partner.name.slice(0, 1)}</span>
            )}
            <div>
              <p className="eyebrow">{partner.category}</p>
              <h1>{partner.name}</h1>
              <p>{partner.shortDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container partner-detail-grid">
          <article className="partner-main-card">
            <div className="partner-meta-row">
              <span className="category-pill">{partner.redemptionType === "both" ? "Physical & online" : partner.redemptionType}</span>
              <span className={active ? "status-active" : "status-inactive"}>{active ? "Currently active" : "Check validity"}</span>
            </div>
            <p className="discount-label large">{partner.discountLabel || partner.offerTitle}</p>
            <h2>{partner.offerTitle}</h2>
            <p className="lead-copy">{partner.offerDetails}</p>

            {partner.showPromoCodePublicly && partner.promoCode ? (
              <div className="promo-code-box">
                <span>Promo code</span>
                <strong>{partner.promoCode}</strong>
              </div>
            ) : partner.promoCode ? (
              <div className="private-code-note">
                <strong>Member promo code available</strong>
                <p>Open the official FICCI program in My Glue or contact FICCI for the approved redemption code.</p>
              </div>
            ) : null}

            {partner.fullDescription ? (
              <div className="content-block">
                <h2>About the establishment</h2>
                <p>{partner.fullDescription}</p>
              </div>
            ) : null}

            {partner.branches.length ? (
              <div className="content-block">
                <h2>Participating branches</h2>
                <ul className="plain-list">
                  {partner.branches.map((branch) => <li key={branch}>{branch}</li>)}
                </ul>
              </div>
            ) : null}

            {partner.terms.length ? (
              <div className="content-block">
                <h2>Terms and conditions</h2>
                <ul className="plain-list">
                  {partner.terms.map((term) => <li key={term}>{term}</li>)}
                </ul>
              </div>
            ) : null}
          </article>

          <aside className="partner-side-card">
            <p className="eyebrow">Validity</p>
            <p><strong>Starts:</strong><br />{formatDate(partner.startDate)}</p>
            <p><strong>Ends:</strong><br />{formatDate(partner.endDate)}</p>
            <hr />
            <p className="eyebrow">Member requirement</p>
            <p>Present an active FICCI membership ID through the My Glue app before payment.</p>
            <div className="vertical-buttons no-print">
              {partner.websiteUrl ? <a className="button button-secondary" href={partner.websiteUrl} target="_blank" rel="noreferrer">Visit website</a> : null}
              {partner.onlineStoreUrl ? <a className="button button-primary" href={partner.onlineStoreUrl} target="_blank" rel="noreferrer">Open online store</a> : null}
              <a className="button button-secondary" href={siteConfig.myGlueDownloadUrl} target="_blank" rel="noreferrer">Download My Glue</a>
              <a className="button button-secondary" href={siteConfig.glueUpProgramUrl} target="_blank" rel="noreferrer">Open FICCI program</a>
            </div>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
