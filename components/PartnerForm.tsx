"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Partner, PartnerInput, RedemptionType } from "@/lib/types";

type FormState = {
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  offerTitle: string;
  offerDetails: string;
  discountLabel: string;
  redemptionType: RedemptionType;
  promoCode: string;
  showPromoCodePublicly: boolean;
  websiteUrl: string;
  onlineStoreUrl: string;
  logoUrl: string;
  coverImageUrl: string;
  branchesText: string;
  termsText: string;
  startDate: string;
  endDate: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  published: boolean;
  featured: boolean;
};

function getInitialState(partner?: Partner | null): FormState {
  return {
    name: partner?.name || "",
    slug: partner?.slug || "",
    category: partner?.category || "Dining",
    shortDescription: partner?.shortDescription || "",
    fullDescription: partner?.fullDescription || "",
    offerTitle: partner?.offerTitle || "",
    offerDetails: partner?.offerDetails || "",
    discountLabel: partner?.discountLabel || "",
    redemptionType: partner?.redemptionType || "physical",
    promoCode: partner?.promoCode || "",
    showPromoCodePublicly: partner?.showPromoCodePublicly || false,
    websiteUrl: partner?.websiteUrl || "",
    onlineStoreUrl: partner?.onlineStoreUrl || "",
    logoUrl: partner?.logoUrl || "",
    coverImageUrl: partner?.coverImageUrl || "",
    branchesText: partner?.branches.join("\n") || "",
    termsText: partner?.terms.join("\n") || "",
    startDate: partner?.startDate || "",
    endDate: partner?.endDate || "",
    contactName: partner?.contactName || "",
    contactEmail: partner?.contactEmail || "",
    contactPhone: partner?.contactPhone || "",
    published: partner?.published || false,
    featured: partner?.featured || false,
  };
}

const commonCategories = [
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

export function PartnerForm({ partner }: { partner?: Partner | null }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => getInitialState(partner));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const editing = Boolean(partner);

  const previewImage = useMemo(
    () => form.coverImageUrl || form.logoUrl,
    [form.coverImageUrl, form.logoUrl],
  );

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
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

    const payload: PartnerInput = {
      name: form.name,
      slug: form.slug,
      category: form.category,
      shortDescription: form.shortDescription,
      fullDescription: form.fullDescription,
      offerTitle: form.offerTitle,
      offerDetails: form.offerDetails,
      discountLabel: form.discountLabel,
      redemptionType: form.redemptionType,
      promoCode: form.promoCode,
      showPromoCodePublicly: form.showPromoCodePublicly,
      websiteUrl: form.websiteUrl,
      onlineStoreUrl: form.onlineStoreUrl,
      logoUrl: form.logoUrl,
      coverImageUrl: form.coverImageUrl,
      branches: toLines(form.branchesText),
      terms: toLines(form.termsText),
      startDate: form.startDate,
      endDate: form.endDate,
      contactName: form.contactName,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      published: form.published,
      featured: form.featured,
    };

    try {
      const response = await fetch(
        editing ? `/api/admin/partners/${partner!.id}` : "/api/admin/partners",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to save the partner.");
      router.push("/admin");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to save the partner.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="partner-form" onSubmit={handleSubmit}>
      <section className="form-section">
        <div className="form-section-heading">
          <p className="eyebrow">Establishment</p>
          <h2>Basic details</h2>
        </div>
        <div className="form-grid two-fields">
          <label>
            <span>Establishment name *</span>
            <input value={form.name} onChange={(event) => setField("name", event.target.value)} required />
          </label>
          <label>
            <span>Category *</span>
            <input list="partner-categories" value={form.category} onChange={(event) => setField("category", event.target.value)} required />
            <datalist id="partner-categories">
              {commonCategories.map((item) => <option key={item} value={item} />)}
            </datalist>
          </label>
          <label>
            <span>Custom page slug</span>
            <input value={form.slug} onChange={(event) => setField("slug", event.target.value)} placeholder="auto-generated-from-name" />
          </label>
          <label>
            <span>Redemption channel</span>
            <select value={form.redemptionType} onChange={(event) => setField("redemptionType", event.target.value as RedemptionType)}>
              <option value="physical">Physical establishment</option>
              <option value="online">Online establishment</option>
              <option value="both">Physical and online</option>
            </select>
          </label>
          <label className="full-field">
            <span>Short description</span>
            <textarea rows={2} value={form.shortDescription} onChange={(event) => setField("shortDescription", event.target.value)} placeholder="One- or two-sentence description for the directory card." />
          </label>
          <label className="full-field">
            <span>Full description</span>
            <textarea rows={5} value={form.fullDescription} onChange={(event) => setField("fullDescription", event.target.value)} placeholder="More details about the business, services, and member value." />
          </label>
        </div>
      </section>

      <section className="form-section">
        <div className="form-section-heading">
          <p className="eyebrow">Benefit</p>
          <h2>Discount and redemption details</h2>
        </div>
        <div className="form-grid two-fields">
          <label>
            <span>Offer title *</span>
            <input value={form.offerTitle} onChange={(event) => setField("offerTitle", event.target.value)} placeholder="10% discount for active FICCI members" required />
          </label>
          <label>
            <span>Short discount label</span>
            <input value={form.discountLabel} onChange={(event) => setField("discountLabel", event.target.value)} placeholder="10% OFF" />
          </label>
          <label className="full-field">
            <span>Offer mechanics</span>
            <textarea rows={4} value={form.offerDetails} onChange={(event) => setField("offerDetails", event.target.value)} placeholder="Explain exactly what members receive and how it is applied." />
          </label>
          <label>
            <span>Promo code</span>
            <input value={form.promoCode} onChange={(event) => setField("promoCode", event.target.value)} placeholder="FICCI10" />
          </label>
          <label className="checkbox-label align-end">
            <input type="checkbox" checked={form.showPromoCodePublicly} onChange={(event) => setField("showPromoCodePublicly", event.target.checked)} />
            <span>Show promo code on the public partner page</span>
          </label>
          <label>
            <span>Start date</span>
            <input type="date" value={form.startDate} onChange={(event) => setField("startDate", event.target.value)} />
          </label>
          <label>
            <span>End date</span>
            <input type="date" value={form.endDate} onChange={(event) => setField("endDate", event.target.value)} />
          </label>
          <label className="full-field">
            <span>Terms and exclusions — one item per line</span>
            <textarea rows={6} value={form.termsText} onChange={(event) => setField("termsText", event.target.value)} placeholder={"Valid for active FICCI members only\nPresent My Glue ID before payment\nNot valid with other promotions"} />
          </label>
        </div>
      </section>

      <section className="form-section">
        <div className="form-section-heading">
          <p className="eyebrow">Locations and links</p>
          <h2>Where members can redeem</h2>
        </div>
        <div className="form-grid two-fields">
          <label>
            <span>Website URL</span>
            <input type="url" value={form.websiteUrl} onChange={(event) => setField("websiteUrl", event.target.value)} placeholder="https://example.com" />
          </label>
          <label>
            <span>Online store / checkout URL</span>
            <input type="url" value={form.onlineStoreUrl} onChange={(event) => setField("onlineStoreUrl", event.target.value)} placeholder="https://shop.example.com" />
          </label>
          <label className="full-field">
            <span>Participating branches — one branch per line</span>
            <textarea rows={6} value={form.branchesText} onChange={(event) => setField("branchesText", event.target.value)} placeholder={"Makati Branch — 123 Sample Street\nBGC Branch — 456 Sample Avenue"} />
          </label>
        </div>
      </section>

      <section className="form-section">
        <div className="form-section-heading">
          <p className="eyebrow">Brand assets</p>
          <h2>Images</h2>
        </div>
        <div className="form-grid two-fields">
          <label>
            <span>Logo image URL</span>
            <input type="url" value={form.logoUrl} onChange={(event) => setField("logoUrl", event.target.value)} placeholder="https://..." />
          </label>
          <label>
            <span>Cover image URL</span>
            <input type="url" value={form.coverImageUrl} onChange={(event) => setField("coverImageUrl", event.target.value)} placeholder="https://..." />
          </label>
        </div>
        {previewImage ? (
          <div className="image-preview">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewImage} alt="Partner image preview" />
          </div>
        ) : null}
      </section>

      <section className="form-section">
        <div className="form-section-heading">
          <p className="eyebrow">Internal reference</p>
          <h2>Partner contact</h2>
          <p className="muted-copy">These contact details do not appear on the public page.</p>
        </div>
        <div className="form-grid three-fields">
          <label>
            <span>Contact person</span>
            <input value={form.contactName} onChange={(event) => setField("contactName", event.target.value)} />
          </label>
          <label>
            <span>Contact email</span>
            <input type="email" value={form.contactEmail} onChange={(event) => setField("contactEmail", event.target.value)} />
          </label>
          <label>
            <span>Contact phone</span>
            <input value={form.contactPhone} onChange={(event) => setField("contactPhone", event.target.value)} />
          </label>
        </div>
      </section>

      <section className="form-section publish-section">
        <div>
          <p className="eyebrow">Visibility</p>
          <h2>Publishing options</h2>
        </div>
        <div className="checkbox-stack">
          <label className="checkbox-label">
            <input type="checkbox" checked={form.published} onChange={(event) => setField("published", event.target.checked)} />
            <span><strong>Publish this establishment</strong><small>It will appear in the public directory.</small></span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={form.featured} onChange={(event) => setField("featured", event.target.checked)} />
            <span><strong>Feature this establishment</strong><small>It will be prioritized on the homepage and directory.</small></span>
          </label>
        </div>
      </section>

      {error ? <p className="form-error">{error}</p> : null}
      <div className="form-actions">
        <button className="button button-secondary" type="button" onClick={() => router.push("/admin")}>Cancel</button>
        <button className="button button-primary" type="submit" disabled={submitting}>
          {submitting ? "Saving…" : editing ? "Save changes" : "Add partner establishment"}
        </button>
      </div>
    </form>
  );
}
