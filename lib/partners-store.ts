import "server-only";

import { get, put } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { slugify } from "@/lib/format";
import type { Partner, PartnerInput, RedemptionType } from "@/lib/types";

const BLOB_PATHNAME = "ficci-benefits/data/partners.json";
const LOCAL_DATA_PATH = path.join(process.cwd(), "data", "partners.json");

function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map(cleanString).filter(Boolean);
}

function cleanBoolean(value: unknown) {
  return value === true || value === "true" || value === "on";
}

function cleanRedemptionType(value: unknown): RedemptionType {
  return value === "physical" || value === "online" || value === "both"
    ? value
    : "physical";
}

export function normalizePartnerInput(input: unknown): PartnerInput {
  const record = (input && typeof input === "object" ? input : {}) as Record<
    string,
    unknown
  >;

  const name = cleanString(record.name);
  if (!name) throw new Error("Establishment name is required.");

  const offerTitle = cleanString(record.offerTitle);
  if (!offerTitle) throw new Error("Offer title is required.");

  return {
    name,
    slug: cleanString(record.slug),
    category: cleanString(record.category) || "Other",
    shortDescription: cleanString(record.shortDescription),
    fullDescription: cleanString(record.fullDescription),
    offerTitle,
    offerDetails: cleanString(record.offerDetails),
    discountLabel: cleanString(record.discountLabel),
    redemptionType: cleanRedemptionType(record.redemptionType),
    promoCode: cleanString(record.promoCode),
    showPromoCodePublicly: cleanBoolean(record.showPromoCodePublicly),
    websiteUrl: cleanString(record.websiteUrl),
    onlineStoreUrl: cleanString(record.onlineStoreUrl),
    logoUrl: cleanString(record.logoUrl),
    coverImageUrl: cleanString(record.coverImageUrl),
    branches: cleanStringArray(record.branches),
    terms: cleanStringArray(record.terms),
    startDate: cleanString(record.startDate),
    endDate: cleanString(record.endDate),
    contactName: cleanString(record.contactName),
    contactEmail: cleanString(record.contactEmail),
    contactPhone: cleanString(record.contactPhone),
    published: cleanBoolean(record.published),
    featured: cleanBoolean(record.featured),
  };
}

async function readLocalPartners(): Promise<Partner[]> {
  try {
    const contents = await fs.readFile(LOCAL_DATA_PATH, "utf8");
    return JSON.parse(contents) as Partner[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function writeLocalPartners(partners: Partner[]) {
  await fs.mkdir(path.dirname(LOCAL_DATA_PATH), { recursive: true });
  await fs.writeFile(LOCAL_DATA_PATH, JSON.stringify(partners, null, 2), "utf8");
}

async function readBlobPartners(): Promise<Partner[]> {
  const result = await get(BLOB_PATHNAME, { access: "private" });
  if (!result || result.statusCode !== 200 || !result.stream) return [];

  const response = new Response(result.stream);
  return (await response.json()) as Partner[];
}

async function writeBlobPartners(partners: Partner[]) {
  await put(BLOB_PATHNAME, JSON.stringify(partners, null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    contentType: "application/json",
  });
}

export async function getPartners() {
  let partners: Partner[];

  if (isBlobConfigured()) {
    const blobPartners = await readBlobPartners();

    // On the first Vercel deployment, seed the private Blob store from
    // data/partners.json so the complete sample partner appears immediately.
    if (blobPartners.length === 0) {
      const seedPartners = await readLocalPartners();
      if (seedPartners.length > 0) {
        await writeBlobPartners(seedPartners);
        partners = seedPartners;
      } else {
        partners = [];
      }
    } else {
      partners = blobPartners;
    }
  } else {
    partners = await readLocalPartners();
  }

  return partners.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export async function getPublishedPartners() {
  return (await getPartners()).filter((partner) => partner.published);
}

export async function getPartnerById(id: string) {
  return (await getPartners()).find((partner) => partner.id === id) || null;
}

export async function getPartnerBySlug(slug: string) {
  return (
    (await getPublishedPartners()).find((partner) => partner.slug === slug) || null
  );
}

async function savePartners(partners: Partner[]) {
  if (isBlobConfigured()) {
    await writeBlobPartners(partners);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Vercel Blob is not connected. Create a private Blob store and redeploy before saving partner data.",
    );
  }

  await writeLocalPartners(partners);
}

async function createUniqueSlug(name: string, requestedSlug: string, partners: Partner[]) {
  const base = slugify(requestedSlug || name) || randomUUID().slice(0, 8);
  let candidate = base;
  let suffix = 2;
  while (partners.some((partner) => partner.slug === candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

export async function createPartner(input: unknown) {
  const normalized = normalizePartnerInput(input);
  const partners = await getPartners();
  const now = new Date().toISOString();
  const partner: Partner = {
    ...normalized,
    id: randomUUID(),
    slug: await createUniqueSlug(normalized.name, normalized.slug || "", partners),
    createdAt: now,
    updatedAt: now,
  };
  await savePartners([...partners, partner]);
  return partner;
}

export async function updatePartner(id: string, input: unknown) {
  const normalized = normalizePartnerInput(input);
  const partners = await getPartners();
  const index = partners.findIndex((partner) => partner.id === id);
  if (index < 0) throw new Error("Partner establishment was not found.");

  const otherPartners = partners.filter((partner) => partner.id !== id);
  const current = partners[index];
  const requestedSlug = normalized.slug || current.slug;
  const slug = await createUniqueSlug(normalized.name, requestedSlug, otherPartners);

  const updated: Partner = {
    ...current,
    ...normalized,
    slug,
    updatedAt: new Date().toISOString(),
  };
  partners[index] = updated;
  await savePartners(partners);
  return updated;
}

export async function deletePartner(id: string) {
  const partners = await getPartners();
  const next = partners.filter((partner) => partner.id !== id);
  if (next.length === partners.length) {
    throw new Error("Partner establishment was not found.");
  }
  await savePartners(next);
}
