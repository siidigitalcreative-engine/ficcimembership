import { PartnerApplicationForm } from "@/components/PartnerApplicationForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./apply.module.css";

export const metadata = {
  title: "Become a FICCI Benefit Partner",
  description:
    "Apply to join the FICCI Membership Discount Benefits Program as a physical or online establishment.",
};

const processSteps = [
  {
    title: "Submit your establishment details",
    description:
      "Provide your business profile, authorized contact, official links, and participating branches.",
  },
  {
    title: "Propose a member benefit",
    description:
      "State the discount, privilege, minimum purchase, promo code, validity, and redemption conditions.",
  },
  {
    title: "FICCI reviews the application",
    description:
      "The team may contact you to confirm the offer, request revisions, test the promo code, and complete onboarding.",
  },
];

export default function PartnerApplicationPage() {
  return (
    <main>
      <SiteHeader />

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <p className="eyebrow">Benefit Partner Application</p>
              <h1>Bring exclusive value to the FICCI member community.</h1>
              <p className={styles.heroCopy}>
                Physical and online establishments may apply by submitting their
                basic business details and the discount, privilege, or promo
                code they would like to offer active FICCI members.
              </p>
            </div>

            <aside className={styles.heroCard}>
              <p>Prepare before applying</p>
              <ul>
                <li>Authorized representative details</li>
                <li>Business and branch information</li>
                <li>Exact discount or benefit mechanics</li>
                <li>Promo code and online link, when applicable</li>
                <li>Validity, exclusions, and minimum purchase</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.processGrid}>
            {processSteps.map((step, index) => (
              <article key={step.title}>
                <span>{index + 1}</span>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className="container">
          <div className={styles.formIntro}>
            <p className="eyebrow">Application form</p>
            <h2>Establishment and member-benefit details</h2>
            <p>
              Required fields are marked with an asterisk. Submission does not
              automatically publish the establishment; all information remains
              subject to FICCI review and approval.
            </p>
          </div>

          <PartnerApplicationForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
