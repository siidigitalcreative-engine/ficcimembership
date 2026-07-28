import { PrintButton } from "@/components/PrintButton";
import { siteConfig } from "@/lib/site-config";

const steps = [
  {
    title: "Download the My Glue app",
    description:
      "Install My Glue on your mobile device using the official download page.",
  },
  {
    title: "Log in with your FICCI-registered email",
    description:
      "Use the same email address registered in your FICCI membership record. Using a different email may prevent your membership from appearing.",
  },
  {
    title: "Select the correct server",
    description:
      "Choose Global Server (.com) when prompted, unless FICCI provides a different instruction.",
  },
  {
    title: "Open your membership profile",
    description:
      "Confirm that your FICCI membership is visible and active before visiting a participating establishment.",
  },
  {
    title: "Present your active membership before payment",
    description:
      "Inform the staff that you will use the FICCI Membership Benefit and show your active membership details in My Glue before the bill is finalized.",
  },
];

const reminders = [
  "Benefits are intended for active FICCI members and may not be transferable.",
  "Present your membership details before payment or checkout.",
  "A participating establishment may request a valid ID for verification.",
  "Discounts, exclusions, minimum purchases, branches, validity dates, and payment conditions may vary by partner.",
  "Unless stated by the partner, a membership benefit may not be combined with another promotion.",
];

const faqs = [
  {
    question: "What if I used a different email address?",
    answer:
      "Log out and sign in using the email registered with FICCI. Contact FICCI Membership Support when your registered email needs to be confirmed or updated.",
  },
  {
    question: "What if my FICCI membership does not appear?",
    answer:
      "Check that you selected the correct server and used your registered email. Close and reopen the app, then contact Membership Support if the issue continues.",
  },
  {
    question: "What if an establishment does not honor the benefit?",
    answer:
      "Record the establishment name, branch, date, and details of the issue. Keep the receipt or a screenshot when available and report it to FICCI.",
  },
  {
    question: "How do I use an online discount?",
    answer:
      "Open the official partner link, check the offer conditions, and enter the approved promo code before checkout. Confirm that the discount was applied before paying.",
  },
];

export default function HomePage() {
  const supportHref = `mailto:${siteConfig.supportEmail}?subject=FICCI%20Membership%20Benefits%20Support`;

  return (
    <main>
      <header className="site-header no-print">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="FICCI Membership Benefits Guide home">
            <span className="brand-mark" aria-hidden="true">F</span>
            <span>
              <strong>{siteConfig.organizationName}</strong>
              <small>Membership Benefits Guide</small>
            </span>
          </a>
          <nav aria-label="Page navigation">
            <a href="#how-to-use">How to Use</a>
            <a href="#reminders">Reminders</a>
            <a href="#help">Help</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Member Awareness Guide</p>
            <h1>Access and enjoy your FICCI membership benefits.</h1>
            <p className="hero-copy">
              Download My Glue and sign in using the email address registered with FICCI.
            </p>
            <div className="button-row no-print">
              <a
                className="button button-primary"
                href={siteConfig.myGlueDownloadUrl}
                target="_blank"
                rel="noreferrer"
              >
                Download My Glue
              </a>
              {siteConfig.benefitsDirectoryUrl ? (
                <a
                  className="button button-secondary"
                  href={siteConfig.benefitsDirectoryUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Participating Establishments
                </a>
              ) : null}
              <PrintButton />
            </div>
          </div>

          <aside className="hero-card" aria-label="Quick reminder">
            <span className="check-icon" aria-hidden="true">✓</span>
            <p>Before visiting a partner</p>
            <strong>Make sure your membership appears as active in My Glue.</strong>
          </aside>
        </div>
      </section>

      <section className="section" id="how-to-use">
        <div className="container content-container">
          <div className="section-heading">
            <p className="eyebrow">Step-by-step</p>
            <h2>How to avail your benefits</h2>
            <p>Complete these steps before paying at a participating establishment.</p>
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
        </div>
      </section>

      <section className="section section-soft">
        <div className="container two-column">
          <article className="info-card">
            <p className="eyebrow">Physical establishments</p>
            <h2>In-store redemption</h2>
            <ol className="compact-list ordered">
              <li>Check the partner’s discount, branch coverage, and conditions.</li>
              <li>Inform the staff before payment that you will use the FICCI benefit.</li>
              <li>Show your active FICCI membership in the My Glue app.</li>
              <li>Present a valid ID when requested.</li>
              <li>Confirm that the correct benefit was applied before paying.</li>
            </ol>
          </article>

          <article className="info-card">
            <p className="eyebrow">Online establishments</p>
            <h2>Online redemption</h2>
            <ol className="compact-list ordered">
              <li>Use the official link provided in the benefits directory.</li>
              <li>Review eligible products, minimum purchase, and expiry date.</li>
              <li>Enter the approved FICCI promo code at checkout.</li>
              <li>Confirm the discount before completing payment.</li>
              <li>Take a screenshot and report the issue if the code does not work.</li>
            </ol>
          </article>
        </div>
      </section>

      <section className="section" id="reminders">
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

      <section className="section section-soft" id="help">
        <div className="container content-container">
          <div className="section-heading">
            <p className="eyebrow">Troubleshooting</p>
            <h2>Frequently asked questions</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="support-card">
            <div>
              <p className="eyebrow">Member support</p>
              <h2>Still need assistance?</h2>
              <p>
                Contact FICCI and include your registered email, the establishment name,
                branch, date, and a short description of the concern.
              </p>
              <p className="support-details">
                <strong>Email:</strong> {siteConfig.supportEmail}
                {siteConfig.supportPhone ? (
                  <><br /><strong>Phone:</strong> {siteConfig.supportPhone}</>
                ) : null}
              </p>
            </div>
            <a className="button button-primary no-print" href={supportHref}>
              Contact Membership Support
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} {siteConfig.organizationName}. Membership Benefits Program.</p>
          <p>Partner offers are subject to their respective terms, validity, and availability.</p>
        </div>
      </footer>
    </main>
  );
}
