"use client";

import { FormEvent, useState } from "react";
import styles from "./PartnerApplicationForm.module.css";
import type { OfferType } from "@/lib/application-types";
import type { RedemptionType } from "@/lib/types";

type FormState = {
  establishmentName: string;
  registeredBusinessName: string;
  category: string;
  redemptionType: RedemptionType;
  shortDescription: string;
  businessAddress: string;
  branchesText: string;

  websiteUrl: string;
  onlineStoreUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  logoUrl: string;
  coverImageUrl: string;

  contactName: string;
  contactPosition: string;
  contactEmail: string;
  contactPhone: string;

  offerType: OfferType;
  offerTitle: string;
  discountLabel: string;
  offerDetails: string;
  promoCode: string;
  minimumPurchase: string;
  eligibleItems: string;
  exclusions: string;
  redemptionInstructions: string;
  startDate: string;
  endDate: string;

  authorizedToApply: boolean;
  marketingConsent: boolean;
  informationConfirmed: boolean;
  companyWebsite: string;
};

const initialState: FormState = {
  establishmentName: "",
  registeredBusinessName: "",
  category: "Dining",
  redemptionType: "physical",
  shortDescription: "",
  businessAddress: "",
  branchesText: "",

  websiteUrl: "",
  onlineStoreUrl: "",
  facebookUrl: "",
  instagramUrl: "",
  logoUrl: "",
  coverImageUrl: "",

  contactName: "",
  contactPosition: "",
  contactEmail: "",
  contactPhone: "",

  offerType: "percentage-discount",
  offerTitle: "",
  discountLabel: "",
  offerDetails: "",
  promoCode: "",
  minimumPurchase: "",
  eligibleItems: "",
  exclusions: "",
  redemptionInstructions: "",
  startDate: "",
  endDate: "",

  authorizedToApply: false,
  marketingConsent: false,
  informationConfirmed: false,
  companyWebsite: "",
};

const categories = [
  "Dining",
  "Retail",
  "Health & Wellness",
  "Hotels & Travel",
  "Professional Services",
  "Education & Training",
  "Fitness",
  "Beauty & Personal Care",
  "Automotive",
  "Online Shopping",
  "Other",
];

export function PartnerApplicationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  function setField<K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toLines(value: string) {
    return value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/partner-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          branches: toLines(form.branchesText),
        }),
      });

      const result = (await response.json()) as {
        error?: string;
        referenceNumber?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit the application.");
      }

      setReferenceNumber(result.referenceNumber || "");
      setForm(initialState);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to submit the application.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (referenceNumber) {
    return (
      <section className={styles.successCard} aria-live="polite">
        <div className={styles.successIcon}>✓</div>
        <p className={styles.eyebrow}>Application received</p>
        <h2>Thank you for your interest in becoming a Benefit Partner.</h2>
        <p>
          The FICCI team will review the establishment details, proposed
          discount, promo code, and redemption conditions before contacting
          your authorized representative.
        </p>
        <div className={styles.referenceBox}>
          <span>Application reference</span>
          <strong>{referenceNumber}</strong>
        </div>
        <button
          className={styles.secondaryButton}
          type="button"
          onClick={() => setReferenceNumber("")}
        >
          Submit another application
        </button>
      </section>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>01</span>
          <div>
            <p className={styles.eyebrow}>Establishment profile</p>
            <h2>Tell us about your business</h2>
            <p>
              Provide the information that may appear in the public Benefits
              Directory after approval.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          <label>
            <span>Public establishment name *</span>
            <input
              value={form.establishmentName}
              onChange={(event) =>
                setField("establishmentName", event.target.value)
              }
              required
            />
          </label>

          <label>
            <span>Registered business name</span>
            <input
              value={form.registeredBusinessName}
              onChange={(event) =>
                setField("registeredBusinessName", event.target.value)
              }
            />
          </label>

          <label>
            <span>Business category *</span>
            <select
              value={form.category}
              onChange={(event) => setField("category", event.target.value)}
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Establishment type *</span>
            <select
              value={form.redemptionType}
              onChange={(event) =>
                setField(
                  "redemptionType",
                  event.target.value as RedemptionType,
                )
              }
              required
            >
              <option value="physical">Physical establishment</option>
              <option value="online">Online establishment</option>
              <option value="both">Physical and online</option>
            </select>
          </label>

          <label className={styles.fullField}>
            <span>Short business description *</span>
            <textarea
              rows={3}
              value={form.shortDescription}
              onChange={(event) =>
                setField("shortDescription", event.target.value)
              }
              placeholder="Briefly describe your products, services, and target customers."
              required
            />
          </label>

          <label className={styles.fullField}>
            <span>Main business address</span>
            <textarea
              rows={2}
              value={form.businessAddress}
              onChange={(event) =>
                setField("businessAddress", event.target.value)
              }
            />
          </label>

          <label className={styles.fullField}>
            <span>Participating branches — one per line</span>
            <textarea
              rows={4}
              value={form.branchesText}
              onChange={(event) =>
                setField("branchesText", event.target.value)
              }
              placeholder={"Makati Branch — complete address\nBGC Branch — complete address"}
            />
          </label>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>02</span>
          <div>
            <p className={styles.eyebrow}>Digital presence</p>
            <h2>Add your official links and brand assets</h2>
          </div>
        </div>

        <div className={styles.grid}>
          <label>
            <span>Website URL</span>
            <input
              type="url"
              value={form.websiteUrl}
              onChange={(event) => setField("websiteUrl", event.target.value)}
              placeholder="https://"
            />
          </label>

          <label>
            <span>Online store URL</span>
            <input
              type="url"
              value={form.onlineStoreUrl}
              onChange={(event) =>
                setField("onlineStoreUrl", event.target.value)
              }
              placeholder="https://"
            />
          </label>

          <label>
            <span>Facebook page</span>
            <input
              type="url"
              value={form.facebookUrl}
              onChange={(event) => setField("facebookUrl", event.target.value)}
              placeholder="https://facebook.com/"
            />
          </label>

          <label>
            <span>Instagram page</span>
            <input
              type="url"
              value={form.instagramUrl}
              onChange={(event) => setField("instagramUrl", event.target.value)}
              placeholder="https://instagram.com/"
            />
          </label>

          <label>
            <span>Logo image URL</span>
            <input
              type="url"
              value={form.logoUrl}
              onChange={(event) => setField("logoUrl", event.target.value)}
              placeholder="Google Drive or direct image link"
            />
          </label>

          <label>
            <span>Cover image URL</span>
            <input
              type="url"
              value={form.coverImageUrl}
              onChange={(event) =>
                setField("coverImageUrl", event.target.value)
              }
              placeholder="Google Drive or direct image link"
            />
          </label>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>03</span>
          <div>
            <p className={styles.eyebrow}>Authorized representative</p>
            <h2>Who should FICCI contact?</h2>
            <p>These contact details will remain for internal coordination.</p>
          </div>
        </div>

        <div className={styles.grid}>
          <label>
            <span>Contact person *</span>
            <input
              value={form.contactName}
              onChange={(event) => setField("contactName", event.target.value)}
              required
            />
          </label>

          <label>
            <span>Position / designation</span>
            <input
              value={form.contactPosition}
              onChange={(event) =>
                setField("contactPosition", event.target.value)
              }
            />
          </label>

          <label>
            <span>Email address *</span>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(event) => setField("contactEmail", event.target.value)}
              required
            />
          </label>

          <label>
            <span>Mobile / telephone number *</span>
            <input
              value={form.contactPhone}
              onChange={(event) => setField("contactPhone", event.target.value)}
              required
            />
          </label>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>04</span>
          <div>
            <p className={styles.eyebrow}>Member benefit proposal</p>
            <h2>What discount or privilege will you provide?</h2>
            <p>
              Include the exact promo code and conditions so the offer can be
              reviewed and tested before publication.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          <label>
            <span>Offer type *</span>
            <select
              value={form.offerType}
              onChange={(event) =>
                setField("offerType", event.target.value as OfferType)
              }
              required
            >
              <option value="percentage-discount">Percentage discount</option>
              <option value="fixed-discount">Fixed-value discount</option>
              <option value="complimentary-item">
                Complimentary item or service
              </option>
              <option value="special-rate">Exclusive member rate</option>
              <option value="package">Special package</option>
              <option value="promo-code">Promo-code offer</option>
              <option value="other">Other benefit</option>
            </select>
          </label>

          <label>
            <span>Short discount label</span>
            <input
              value={form.discountLabel}
              onChange={(event) =>
                setField("discountLabel", event.target.value)
              }
              placeholder="10% OFF"
            />
          </label>

          <label className={styles.fullField}>
            <span>Offer title *</span>
            <input
              value={form.offerTitle}
              onChange={(event) => setField("offerTitle", event.target.value)}
              placeholder="10% discount for active FICCI members"
              required
            />
          </label>

          <label className={styles.fullField}>
            <span>Complete offer mechanics *</span>
            <textarea
              rows={5}
              value={form.offerDetails}
              onChange={(event) => setField("offerDetails", event.target.value)}
              placeholder="State exactly what members receive, where it applies, and how staff should apply the benefit."
              required
            />
          </label>

          <label>
            <span>Online promo code</span>
            <input
              value={form.promoCode}
              onChange={(event) => setField("promoCode", event.target.value)}
              placeholder="FICCI10"
            />
          </label>

          <label>
            <span>Minimum purchase</span>
            <input
              value={form.minimumPurchase}
              onChange={(event) =>
                setField("minimumPurchase", event.target.value)
              }
              placeholder="Example: ₱1,000"
            />
          </label>

          <label className={styles.fullField}>
            <span>Eligible products or services</span>
            <textarea
              rows={3}
              value={form.eligibleItems}
              onChange={(event) =>
                setField("eligibleItems", event.target.value)
              }
            />
          </label>

          <label className={styles.fullField}>
            <span>Exclusions and restrictions</span>
            <textarea
              rows={3}
              value={form.exclusions}
              onChange={(event) => setField("exclusions", event.target.value)}
              placeholder="Excluded products, blackout dates, payment restrictions, and whether the benefit can be combined with other promotions."
            />
          </label>

          <label className={styles.fullField}>
            <span>Redemption instructions</span>
            <textarea
              rows={4}
              value={form.redemptionInstructions}
              onChange={(event) =>
                setField("redemptionInstructions", event.target.value)
              }
              placeholder="Explain how members should claim the benefit in-store or online."
            />
          </label>

          <label>
            <span>Proposed start date</span>
            <input
              type="date"
              value={form.startDate}
              onChange={(event) => setField("startDate", event.target.value)}
            />
          </label>

          <label>
            <span>Proposed end date</span>
            <input
              type="date"
              value={form.endDate}
              onChange={(event) => setField("endDate", event.target.value)}
            />
          </label>
        </div>
      </section>

      <section className={styles.confirmationSection}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={form.authorizedToApply}
            onChange={(event) =>
              setField("authorizedToApply", event.target.checked)
            }
            required
          />
          <span>
            I confirm that I am authorized to submit this application on behalf
            of the establishment.
          </span>
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={form.informationConfirmed}
            onChange={(event) =>
              setField("informationConfirmed", event.target.checked)
            }
            required
          />
          <span>
            I confirm that the establishment and benefit information provided
            is accurate and may be reviewed by FICCI.
          </span>
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={form.marketingConsent}
            onChange={(event) =>
              setField("marketingConsent", event.target.checked)
            }
          />
          <span>
            The establishment permits FICCI to use its approved name, logo,
            images, and offer details for program promotions.
          </span>
        </label>

        <label className={styles.honeypot} aria-hidden="true">
          Company website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.companyWebsite}
            onChange={(event) =>
              setField("companyWebsite", event.target.value)
            }
          />
        </label>
      </section>

      {error ? (
        <p className={styles.errorMessage} role="alert">
          {error}
        </p>
      ) : null}

      <div className={styles.submitRow}>
        <div>
          <strong>Review before submitting</strong>
          <p>
            FICCI may contact the authorized representative to confirm or revise
            the proposed benefit.
          </p>
        </div>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Submitting…" : "Submit partner application"}
        </button>
      </div>
    </form>
  );
}
