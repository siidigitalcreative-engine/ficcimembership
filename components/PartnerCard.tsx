import Link from "next/link";
import type { Partner } from "@/lib/types";
import { formatDate, isOfferActive } from "@/lib/format";

export function PartnerCard({ partner }: { partner: Partner }) {
  const active = isOfferActive(partner);
  return (
    <article className="partner-card">
      <div className="partner-card-media">
        {partner.coverImageUrl || partner.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={partner.coverImageUrl || partner.logoUrl}
            alt={`${partner.name} visual`}
          />
        ) : (
          <div className="partner-placeholder" aria-hidden="true">
            {partner.name.slice(0, 1).toUpperCase()}
          </div>
        )}
        {partner.featured ? <span className="featured-badge">Featured</span> : null}
      </div>
      <div className="partner-card-body">
        <div className="partner-meta-row">
          <span className="category-pill">{partner.category}</span>
          <span className={active ? "status-active" : "status-inactive"}>
            {active ? "Active offer" : "Check validity"}
          </span>
        </div>
        <h2>{partner.name}</h2>
        <p className="discount-label">{partner.discountLabel || partner.offerTitle}</p>
        <p>{partner.shortDescription || partner.offerDetails}</p>
        <p className="partner-validity">
          Valid until {formatDate(partner.endDate)}
        </p>
        <Link className="text-link" href={`/partners/${partner.slug}`}>
          View benefit details →
        </Link>
      </div>
    </article>
  );
}
