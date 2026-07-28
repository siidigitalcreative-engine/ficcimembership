import Link from "next/link";
import { ApplicationReviewActions } from "@/components/ApplicationReviewActions";
import { LogoutButton } from "@/components/LogoutButton";
import { requireAdmin } from "@/lib/auth";
import { getPartnerApplications } from "@/lib/partner-applications-store";
import styles from "./applications.module.css";

export const dynamic = "force-dynamic";

function formatSubmittedDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function statusLabel(status: string) {
  if (status === "under-review") return "Under review";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default async function PartnerApplicationsAdminPage() {
  await requireAdmin();
  const applications = await getPartnerApplications();

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="eyebrow">FICCI Benefits Admin</p>
          <h1>Partner applications</h1>
          <p>
            Review establishment information, proposed discounts, promo codes,
            validity, and authorized representative details.
          </p>
        </div>
        <div className="admin-header-actions">
          <Link
            className="button button-secondary button-small"
            href="/admin"
          >
            Partner directory
          </Link>
          <Link
            className="button button-secondary button-small"
            href="/apply"
            target="_blank"
          >
            View application form
          </Link>
          <LogoutButton />
        </div>
      </header>

      <section className={styles.stats}>
        <article>
          <span>Total applications</span>
          <strong>{applications.length}</strong>
        </article>
        <article>
          <span>New</span>
          <strong>
            {
              applications.filter(
                (application) => application.status === "new",
              ).length
            }
          </strong>
        </article>
        <article>
          <span>Under review</span>
          <strong>
            {
              applications.filter(
                (application) => application.status === "under-review",
              ).length
            }
          </strong>
        </article>
        <article>
          <span>Approved</span>
          <strong>
            {
              applications.filter(
                (application) => application.status === "approved",
              ).length
            }
          </strong>
        </article>
      </section>

      {applications.length ? (
        <section className={styles.applicationList}>
          {applications.map((application) => (
            <article key={application.id} className={styles.applicationCard}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.statusRow}>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[
                          `status${application.status
                            .split("-")
                            .map(
                              (part) =>
                                part.charAt(0).toUpperCase() + part.slice(1),
                            )
                            .join("")}`
                        ]
                      }`}
                    >
                      {statusLabel(application.status)}
                    </span>
                    <span className={styles.reference}>
                      {application.referenceNumber}
                    </span>
                  </div>
                  <h2>{application.establishmentName}</h2>
                  <p>
                    {application.category} · {application.redemptionType}
                  </p>
                </div>
                <small>
                  Submitted {formatSubmittedDate(application.createdAt)}
                </small>
              </div>

              <div className={styles.summaryGrid}>
                <section>
                  <h3>Establishment</h3>
                  <dl>
                    <div>
                      <dt>Registered name</dt>
                      <dd>
                        {application.registeredBusinessName || "Not provided"}
                      </dd>
                    </div>
                    <div>
                      <dt>Description</dt>
                      <dd>{application.shortDescription}</dd>
                    </div>
                    <div>
                      <dt>Address</dt>
                      <dd>{application.businessAddress || "Not provided"}</dd>
                    </div>
                    <div>
                      <dt>Branches</dt>
                      <dd>
                        {application.branches.length
                          ? application.branches.join(" · ")
                          : "Not provided"}
                      </dd>
                    </div>
                  </dl>
                </section>

                <section>
                  <h3>Proposed member benefit</h3>
                  <dl>
                    <div>
                      <dt>Offer</dt>
                      <dd>{application.offerTitle}</dd>
                    </div>
                    <div>
                      <dt>Discount label</dt>
                      <dd>{application.discountLabel || "Not provided"}</dd>
                    </div>
                    <div>
                      <dt>Promo code</dt>
                      <dd>
                        {application.promoCode ? (
                          <code>{application.promoCode}</code>
                        ) : (
                          "Not provided"
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>Minimum purchase</dt>
                      <dd>{application.minimumPurchase || "None stated"}</dd>
                    </div>
                    <div>
                      <dt>Validity</dt>
                      <dd>
                        {application.startDate || "Open"} to{" "}
                        {application.endDate || "Open"}
                      </dd>
                    </div>
                  </dl>
                </section>

                <section>
                  <h3>Authorized representative</h3>
                  <dl>
                    <div>
                      <dt>Name</dt>
                      <dd>{application.contactName}</dd>
                    </div>
                    <div>
                      <dt>Position</dt>
                      <dd>{application.contactPosition || "Not provided"}</dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>
                        <a href={`mailto:${application.contactEmail}`}>
                          {application.contactEmail}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt>Phone</dt>
                      <dd>{application.contactPhone}</dd>
                    </div>
                  </dl>
                </section>
              </div>

              <details className={styles.details}>
                <summary>View complete application details</summary>
                <div className={styles.detailsGrid}>
                  <section>
                    <h3>Offer mechanics</h3>
                    <p>{application.offerDetails}</p>
                  </section>
                  <section>
                    <h3>Eligible items</h3>
                    <p>{application.eligibleItems || "Not specified"}</p>
                  </section>
                  <section>
                    <h3>Exclusions</h3>
                    <p>{application.exclusions || "Not specified"}</p>
                  </section>
                  <section>
                    <h3>Redemption instructions</h3>
                    <p>
                      {application.redemptionInstructions || "Not specified"}
                    </p>
                  </section>
                  <section>
                    <h3>Official links</h3>
                    <ul>
                      {application.websiteUrl ? (
                        <li>
                          <a
                            href={application.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Website
                          </a>
                        </li>
                      ) : null}
                      {application.onlineStoreUrl ? (
                        <li>
                          <a
                            href={application.onlineStoreUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Online store
                          </a>
                        </li>
                      ) : null}
                      {application.facebookUrl ? (
                        <li>
                          <a
                            href={application.facebookUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Facebook
                          </a>
                        </li>
                      ) : null}
                      {application.instagramUrl ? (
                        <li>
                          <a
                            href={application.instagramUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Instagram
                          </a>
                        </li>
                      ) : null}
                      {!application.websiteUrl &&
                      !application.onlineStoreUrl &&
                      !application.facebookUrl &&
                      !application.instagramUrl ? (
                        <li>No links provided</li>
                      ) : null}
                    </ul>
                  </section>
                  <section>
                    <h3>Permissions</h3>
                    <p>
                      Authorized to apply:{" "}
                      {application.authorizedToApply ? "Yes" : "No"}
                      <br />
                      Information confirmed:{" "}
                      {application.informationConfirmed ? "Yes" : "No"}
                      <br />
                      Marketing permission:{" "}
                      {application.marketingConsent ? "Yes" : "No"}
                    </p>
                  </section>
                </div>
              </details>

              <ApplicationReviewActions application={application} />
            </article>
          ))}
        </section>
      ) : (
        <section className="admin-panel">
          <div className="empty-state admin-empty">
            <h2>No partner applications yet.</h2>
            <p>
              New applications submitted through the public form will appear
              here for review.
            </p>
            <Link className="button button-primary" href="/apply" target="_blank">
              View public application form
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
