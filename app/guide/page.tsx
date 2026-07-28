import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `My Glue Member Guide | ${siteConfig.organizationName}`,
  description:
    "A clear, step-by-step guide to using My Glue for FICCI membership, events, networking, and member benefits.",
};

const navigation = [
  ["start", "Get started"],
  ["profile", "Set up your profile"],
  ["events", "Access FICCI events"],
  ["membership", "Manage your membership"],
  ["benefits", "Avail partner benefits"],
  ["network", "Network with members"],
  ["desktop", "Use My Glue on desktop"],
  ["support", "Get support"],
] as const;

const profileFeatures = [
  "Profile information",
  "Payment methods",
  "Notification preferences",
  "Member Directory visibility",
  "Direct messaging access",
  "Saved business cards",
];

const eventFeatures = [
  "View upcoming FICCI events and register through the app.",
  "Review past and future registrations in one place.",
  "Access the time, venue, speakers, agenda, organizers, sponsors, and partners.",
  "Open your event confirmation and digital access pass.",
];

const membershipFeatures = [
  {
    title: "Virtual membership card",
    description: "Open your active FICCI membership card whenever verification is required.",
  },
  {
    title: "Membership Directory",
    description: "Browse members and organizations according to their directory visibility settings.",
  },
  {
    title: "Membership renewal",
    description: "Review and manage your membership renewal information from your account.",
  },
  {
    title: "News and notifications",
    description: "Receive FICCI updates, event notices, and membership announcements.",
  },
];

export default function MemberGuidePage() {
  const supportEmail = "info@ficci.com.ph";
  const supportLandline = "+632 8844 7222";
  const supportMobile = "+63 917 152 1399";

  return (
    <main className="guide-page">
      <SiteHeader />

      <section className="guide-hero" id="top">
        <div className="container guide-hero-grid">
          <div className="guide-hero-copy">
            <div className="guide-app-label">
              <Image
                src="/guide/my-glue-logo.webp"
                width={52}
                height={52}
                alt="My Glue app logo"
              />
              <span>Official FICCI member guide</span>
            </div>
            <p className="eyebrow">All-in-one member access</p>
            <h1>Everything you need to use My Glue with confidence.</h1>
            <p>
              Set up your account, access your membership card, register for FICCI
              events, connect with members, and avail partner benefits from one app.
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
              <Link className="button button-secondary" href="/partners">
                View Benefit Partners
              </Link>
            </div>
            <div className="guide-hero-pills" aria-label="Guide highlights">
              <span>Mobile and desktop</span>
              <span>Virtual membership card</span>
              <span>Events and networking</span>
            </div>
          </div>

          <div className="guide-hero-visual" aria-label="My Glue mobile app preview">
            <div className="guide-visual-glow" aria-hidden="true" />
            <Image
              src="/guide/my-glue-phones.webp"
              width={900}
              height={537}
              priority
              alt="Multiple My Glue mobile app screens"
            />
            <div className="guide-quick-card">
              <strong>Before using a benefit</strong>
              <span>Confirm that your FICCI membership is active in My Glue.</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container guide-layout">
        <aside className="guide-sidebar no-print">
          <div className="guide-sidebar-card">
            <p className="guide-sidebar-title">On this page</p>
            <nav className="guide-toc" aria-label="Member guide sections">
              {navigation.map(([id, label], index) => (
                <a key={id} href={`#${id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              ))}
            </nav>
            <div className="guide-sidebar-help">
              <strong>Need quick help?</strong>
              <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
            </div>
          </div>
        </aside>

        <div className="guide-content">
          <section className="guide-section" id="start">
            <div className="guide-section-heading">
              <span className="guide-section-number">01</span>
              <div>
                <p className="eyebrow">First-time setup</p>
                <h2>Download, install, and sign in</h2>
                <p>
                  Use the same email address and password you created when registering
                  for the Glue Up platform.
                </p>
              </div>
            </div>

            <div className="guide-start-grid">
              <div className="guide-step-list">
                <article>
                  <span>1</span>
                  <div>
                    <h3>Download the app</h3>
                    <p>Search for “My Glue from Glue Up” in the App Store or Google Play.</p>
                  </div>
                </article>
                <article>
                  <span>2</span>
                  <div>
                    <h3>Use your registered account</h3>
                    <p>
                      Log in with the same email address and password connected to your
                      FICCI Glue Up membership.
                    </p>
                  </div>
                </article>
                <article>
                  <span>3</span>
                  <div>
                    <h3>Open your FICCI content</h3>
                    <p>
                      After signing in, explore your membership, events, connections,
                      and account settings.
                    </p>
                  </div>
                </article>
              </div>

              <div className="guide-store-grid" aria-label="My Glue app store previews">
                <figure className="guide-phone-frame">
                  <Image
                    src="/guide/app-store.webp"
                    width={501}
                    height={888}
                    alt="My Glue listing in the Apple App Store"
                  />
                  <figcaption>Apple App Store</figcaption>
                </figure>
                <figure className="guide-phone-frame">
                  <Image
                    src="/guide/google-play.webp"
                    width={502}
                    height={888}
                    alt="My Glue listing in Google Play"
                  />
                  <figcaption>Google Play</figcaption>
                </figure>
              </div>
            </div>

            <div className="guide-note">
              <strong>Not sure which email is registered?</strong>
              <p>
                Contact the FICCI Membership and Events team at
                {" "}<a href={`mailto:${supportEmail}`}>{supportEmail}</a> or
                {" "}<a href={`tel:${supportMobile.replace(/\s/g, "")}`}>{supportMobile}</a>.
              </p>
            </div>
          </section>

          <section className="guide-section" id="profile">
            <div className="guide-section-heading">
              <span className="guide-section-number">02</span>
              <div>
                <p className="eyebrow">Your account</p>
                <h2>Complete and personalize your profile</h2>
                <p>
                  Keeping your profile complete helps streamline event registration and
                  makes your digital business card more useful.
                </p>
              </div>
            </div>

            <div className="guide-split">
              <div>
                <ul className="guide-check-grid">
                  {profileFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="guide-note guide-note-compact">
                  <strong>Changing your registered email</strong>
                  <p>
                    Contact FICCI first so your account and membership record remain
                    correctly connected.
                  </p>
                </div>
              </div>
              <div className="guide-media-pair">
                <figure className="guide-phone-frame guide-phone-frame-tall">
                  <Image
                    src="/guide/profile-info.webp"
                    width={489}
                    height={1120}
                    alt="My Glue profile information screen"
                  />
                  <figcaption>Review your account information</figcaption>
                </figure>
                <figure className="guide-phone-frame guide-phone-frame-tall">
                  <Image
                    src="/guide/profile-qr.webp"
                    width={559}
                    height={1280}
                    alt="My Glue profile and personal QR code screen"
                  />
                  <figcaption>Complete your digital profile</figcaption>
                </figure>
              </div>
            </div>
          </section>

          <section className="guide-section" id="events">
            <div className="guide-section-heading">
              <span className="guide-section-number">03</span>
              <div>
                <p className="eyebrow">FICCI events</p>
                <h2>Discover, register, and access your event pass</h2>
                <p>
                  My Glue keeps your event details and registrations available in one
                  place before, during, and after an event.
                </p>
              </div>
            </div>

            <div className="guide-feature-list">
              {eventFeatures.map((feature) => (
                <div key={feature} className="guide-feature-row">
                  <span aria-hidden="true">✓</span>
                  <p>{feature}</p>
                </div>
              ))}
            </div>

            <div className="guide-media-trio">
              <figure className="guide-phone-frame">
                <Image
                  src="/guide/events-list.webp"
                  width={489}
                  height={1120}
                  alt="Upcoming and past FICCI events in My Glue"
                />
                <figcaption>Browse events</figcaption>
              </figure>
              <figure className="guide-phone-frame">
                <Image
                  src="/guide/event-details.webp"
                  width={419}
                  height={960}
                  alt="FICCI event details and agenda in My Glue"
                />
                <figcaption>Review the agenda</figcaption>
              </figure>
              <figure className="guide-phone-frame">
                <Image
                  src="/guide/event-pass.webp"
                  width={419}
                  height={960}
                  alt="Digital event registration and QR access pass"
                />
                <figcaption>Open your access pass</figcaption>
              </figure>
            </div>
          </section>

          <section className="guide-section" id="membership">
            <div className="guide-section-heading">
              <span className="guide-section-number">04</span>
              <div>
                <p className="eyebrow">Membership management</p>
                <h2>Keep your FICCI membership within reach</h2>
                <p>
                  Access your membership card, directory, renewal information, and
                  important notifications from the palm of your hand.
                </p>
              </div>
            </div>

            <div className="guide-membership-grid">
              <div className="guide-feature-cards">
                {membershipFeatures.map((feature) => (
                  <article key={feature.title}>
                    <span aria-hidden="true">✓</span>
                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="guide-media-trio guide-media-trio-compact">
                <figure className="guide-phone-frame">
                  <Image
                    src="/guide/membership-menu.webp"
                    width={489}
                    height={1120}
                    alt="My Glue account and membership menu"
                  />
                  <figcaption>Membership menu</figcaption>
                </figure>
                <figure className="guide-phone-frame guide-phone-frame-dark">
                  <Image
                    src="/guide/membership-card.webp"
                    width={305}
                    height={646}
                    alt="Virtual FICCI membership card"
                  />
                  <figcaption>Virtual membership card</figcaption>
                </figure>
                <figure className="guide-phone-frame">
                  <Image
                    src="/guide/member-directory.webp"
                    width={489}
                    height={1120}
                    alt="Member Directory in My Glue"
                  />
                  <figcaption>Member Directory</figcaption>
                </figure>
              </div>
            </div>
          </section>

          <section className="guide-section guide-benefits-section" id="benefits">
            <div className="guide-section-heading">
              <span className="guide-section-number">05</span>
              <div>
                <p className="eyebrow">Membership Discount Benefits Program</p>
                <h2>Use your virtual membership card to avail partner offers</h2>
                <p>
                  Always review the partner’s offer details before purchasing. Discount
                  rules, branches, promo codes, exclusions, and validity may vary.
                </p>
              </div>
            </div>

            <div className="guide-redemption-grid">
              <article className="guide-redemption-card">
                <div className="guide-redemption-icon" aria-hidden="true">01</div>
                <h3>Choose a Benefit Partner</h3>
                <p>Open the directory and review the available offer and terms.</p>
              </article>
              <article className="guide-redemption-card">
                <div className="guide-redemption-icon" aria-hidden="true">02</div>
                <h3>Open your membership card</h3>
                <p>Confirm that your FICCI membership appears active in My Glue.</p>
              </article>
              <article className="guide-redemption-card">
                <div className="guide-redemption-icon" aria-hidden="true">03</div>
                <h3>Redeem before payment</h3>
                <p>Present the card in-store or apply the approved promo code online.</p>
              </article>
              <article className="guide-redemption-card">
                <div className="guide-redemption-icon" aria-hidden="true">04</div>
                <h3>Confirm the benefit</h3>
                <p>Check that the correct discount was applied before completing payment.</p>
              </article>
            </div>

            <div className="guide-benefit-actions">
              <div>
                <strong>Ready to explore your benefits?</strong>
                <span>Browse approved physical and online establishments.</span>
              </div>
              <Link className="button button-primary no-print" href="/partners">
                View Partner Directory
              </Link>
            </div>
          </section>

          <section className="guide-section" id="network">
            <div className="guide-section-heading">
              <span className="guide-section-number">06</span>
              <div>
                <p className="eyebrow">Professional networking</p>
                <h2>Create, scan, and save digital business cards</h2>
                <p>
                  Use your personal QR code and business card scanner to connect with
                  other FICCI members and keep useful contacts in one place.
                </p>
              </div>
            </div>

            <div className="guide-network-points">
              <span>Personal QR code</span>
              <span>Business card scanner</span>
              <span>Saved contacts</span>
              <span>Direct messaging</span>
            </div>

            <div className="guide-media-trio">
              <figure className="guide-phone-frame">
                <Image
                  src="/guide/card-qr.webp"
                  width={489}
                  height={1120}
                  alt="Personal business card QR code in My Glue"
                />
                <figcaption>Share your QR code</figcaption>
              </figure>
              <figure className="guide-phone-frame">
                <Image
                  src="/guide/saved-cards.webp"
                  width={489}
                  height={1120}
                  alt="Saved business cards in My Glue"
                />
                <figcaption>Save useful contacts</figcaption>
              </figure>
              <figure className="guide-phone-frame">
                <Image
                  src="/guide/member-card.webp"
                  width={419}
                  height={960}
                  alt="Member digital business card profile"
                />
                <figcaption>View member details</figcaption>
              </figure>
            </div>
          </section>

          <section className="guide-section" id="desktop">
            <div className="guide-section-heading">
              <span className="guide-section-number">07</span>
              <div>
                <p className="eyebrow">Desktop access</p>
                <h2>Use My Glue from your computer</h2>
                <p>
                  The core functions available in the mobile app are also accessible
                  through desktop browsing, including events, profiles, connections, and
                  registrations.
                </p>
              </div>
            </div>

            <figure className="guide-desktop-frame">
              <Image
                src="/guide/desktop.webp"
                width={1400}
                height={636}
                alt="My Glue desktop dashboard"
              />
              <figcaption>My Glue desktop dashboard</figcaption>
            </figure>
          </section>

          <section className="guide-support-section" id="support">
            <div>
              <p className="eyebrow">FICCI support</p>
              <h2>Questions about your account or membership?</h2>
              <p>
                Contact the FICCI team when you need help confirming your registered
                email, updating account information, or accessing your membership.
              </p>
            </div>
            <div className="guide-contact-list">
              <a href={`mailto:${supportEmail}`}>
                <span>Email</span>
                <strong>{supportEmail}</strong>
              </a>
              <a href={`tel:${supportLandline.replace(/\s/g, "")}`}>
                <span>Office</span>
                <strong>{supportLandline}</strong>
              </a>
              <a href={`tel:${supportMobile.replace(/\s/g, "")}`}>
                <span>Membership and Events</span>
                <strong>{supportMobile}</strong>
              </a>
            </div>
          </section>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
