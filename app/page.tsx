import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PartnerCard } from "@/components/PartnerCard";
import { getPublishedPartners } from "@/lib/partners-store";
import { siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/format";
import styles from "./home.module.css";

export const dynamic = "force-dynamic";

const steps = [
  {
    title: "Download the My Glue app",
    description: "Install My Glue using the official download page.",
  },
  {
    title: "Log in with your FICCI-registered email",
    description:
      "Use the same email address registered in your FICCI membership record so your active membership appears correctly.",
  },
  {
    title: "Open your active membership ID",
    description:
      "Confirm that your FICCI membership is active before visiting or purchasing from a partner establishment.",
  },
  {
    title: "Review the partner’s offer",
    description:
      "Check the participating branches, minimum purchase, exclusions, promo code, and validity before ordering.",
  },
  {
    title: "Present your membership before payment",
    description:
      "Show your active My Glue ID to the staff or use the approved promo code online before completing payment.",
  },
];

const reminders = [
  "Benefits are intended for active FICCI members and may not be transferable.",
  "Present your membership details before payment or checkout.",
  "A partner may request a valid ID for verification.",
  "Discounts, exclusions, minimum purchases, branches, dates, and payment conditions vary by partner.",
  "Unless stated otherwise, a benefit may not be combined with another promotion.",
];

export default async function HomePage() {
  const partners = await getPublishedPartners();
  const featuredPartners = partners
    .filter((partner) => partner.featured)
    .slice(0, 3);
  const visiblePartners = featuredPartners.length
    ? featuredPartners
    : partners.slice(0, 3);

  return (
    <main className={styles.home}>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">FICCI Member Privileges</p>
            <h1>Membership benefits from trusted partner establishments.</h1>
            <p className="hero-copy">
              Explore exclusive discounts and privileges available to active
              FICCI members through the My Glue app.
            </p>
            <div className="button-row no-print">
              <Link className="button button-primary" href="/partners">
                View Partner Establishments
              </Link>
              <a
                className="button button-secondary"
                href={siteConfig.myGlueDownloadUrl}
                target="_blank"
                rel="noreferrer"
              >
                Download My Glue
              </a>
            </div>
          </div>

          <aside className="hero-card" aria-label="Program information">
            <span className="check-icon" aria-hidden="true">
              ✓
            </span>
            <p>Program validity</p>
            <strong>
              {formatDate(siteConfig.programStartDate)} to{" "}
              {formatDate(siteConfig.programEndDate)}
            </strong>
            <small>
              Present an active FICCI membership in My Glue when availing a
              partner benefit.
            </small>
          </aside>
        </div>
      </section>

      <section className="section" id="partners">
        <div className="container">
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow">Participating establishments</p>
              <h2>Discover member-exclusive benefits</h2>
              <p>
                Browse approved physical and online partners and review each
                offer before redemption.
              </p>
            </div>
            <Link
              className="button button-secondary no-print"
              href="/partners"
            >
              View all partners
            </Link>
          </div>

          {visiblePartners.length ? (
            <div className="partner-grid">
              {visiblePartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>Partner establishments will appear here.</h2>
              <p>
                Approved offers can be added and published through the secure
                admin area.
              </p>
              <Link className="button button-primary no-print" href="/admin">
                Open Admin
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="section section-soft" id="how-to-use">
        <div className="container content-container">
          <div className="section-heading">
            <p className="eyebrow">Member awareness guide</p>
            <h2>How to avail your benefits</h2>
            <p>
              Complete these steps before paying at a participating
              establishment.
            </p>
          </div>

          <ol className="steps-grid">
            {steps.map((step, index) => (
              <li key={step.title} className="step-card">
                <span className="step-number">{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="section-cta no-print">
            <Link className="button button-primary" href="/guide">
              Open the Complete My Glue Guide
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <article className="info-card">
            <p className="eyebrow">Physical establishments</p>
            <h2>In-store redemption</h2>
            <ol className="compact-list ordered">
              <li>
                Check the partner’s offer, branch coverage, and conditions.
              </li>
              <li>
                Inform the staff before payment that you will use the FICCI
                benefit.
              </li>
              <li>Show your active FICCI membership in My Glue.</li>
              <li>Present a valid ID when requested.</li>
              <li>
                Confirm that the correct benefit was applied before paying.
              </li>
            </ol>
          </article>

          <article className="info-card">
            <p className="eyebrow">Online establishments</p>
            <h2>Online redemption</h2>
            <ol className="compact-list ordered">
              <li>Use the official link on the partner’s benefit page.</li>
              <li>
                Review eligible products, minimum purchase, and expiry date.
              </li>
              <li>Enter the approved FICCI promo code at checkout.</li>
              <li>Confirm the discount before completing payment.</li>
              <li>
                Take a screenshot and report the issue if the code does not
                work.
              </li>
            </ol>
          </article>
        </div>
      </section>

      <section className="section section-soft" id="reminders">
        <div className="container content-container">
          <div className="notice-card">
            <div>
              <p className="eyebrow">Important</p>
              <h2>Please remember</h2>
            </div>
            <ul className="check-list">
              {reminders.map((reminder) => (
                <li key={reminder}>{reminder}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="help">
        <div className="container content-container">
          <div className="support-card">
            <div>
              <p className="eyebrow">Member support</p>
              <h2>Need assistance?</h2>
              <p>
                Contact FICCI and include your registered email, establishment
                name, branch, date, and a short description of your concern.
              </p>
              <p className="support-details">
                {siteConfig.supportEmail ? (
                  <>
                    <strong>Email:</strong> {siteConfig.supportEmail}
                    <br />
                  </>
                ) : null}
                <strong>Phone:</strong> {siteConfig.supportPhone}
              </p>
            </div>
            <a
              className="button button-primary no-print"
              href={
                siteConfig.supportEmail
                  ? `mailto:${siteConfig.supportEmail}?subject=FICCI%20Membership%20Benefits%20Support`
                  : siteConfig.glueUpProgramUrl
              }
              target={siteConfig.supportEmail ? undefined : "_blank"}
              rel={siteConfig.supportEmail ? undefined : "noreferrer"}
            >
              {siteConfig.supportEmail
                ? "Contact Membership Support"
                : "Contact through Glue Up"}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
