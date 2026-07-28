import "server-only";

import { get, put } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type {
  ApplicationStatus,
  OfferType,
  PartnerApplication,
  PartnerApplicationInput,
} from "@/lib/application-types";
import type { RedemptionType } from "@/lib/types";

const BLOB_PATHNAME = "ficci-benefits/data/partner-applications.json";
const LOCAL_DATA_PATH = path.join(
  process.cwd(),
  "data",
  "partner-applications.json",
);

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

function cleanOfferType(value: unknown): OfferType {
  const allowed: OfferType[] = [
    "percentage-discount",
    "fixed-discount",
    "complimentary-item",
    "special-rate",
    "package",
    "promo-code",
    "other",
  ];

  return allowed.includes(value as OfferType)
    ? (value as OfferType)
    : "percentage-discount";
}

function cleanApplicationStatus(value: unknown): ApplicationStatus {
  return value === "new" ||
    value === "under-review" ||
    value === "approved" ||
    value === "declined"
    ? value
    : "new";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function normalizePartnerApplicationInput(
  input: unknown,
): PartnerApplicationInput {
  const record = (input && typeof input === "object" ? input : {}) as Record<
    string,
    unknown
  >;

  const establishmentName = cleanString(record.establishmentName);
  const category = cleanString(record.category);
  const shortDescription = cleanString(record.shortDescription);
  const contactName = cleanString(record.contactName);
  const contactEmail = cleanString(record.contactEmail);
  const contactPhone = cleanString(record.contactPhone);
  const offerTitle = cleanString(record.offerTitle);
  const offerDetails = cleanString(record.offerDetails);

  if (!establishmentName) {
    throw new Error("Establishment name is required.");
  }
  if (!category) {
    throw new Error("Business category is required.");
  }
  if (!shortDescription) {
    throw new Error("A short business description is required.");
  }
  if (!contactName) {
    throw new Error("Authorized representative is required.");
  }
  if (!contactEmail || !isValidEmail(contactEmail)) {
    throw new Error("A valid contact email is required.");
  }
  if (!contactPhone) {
    throw new Error("Contact number is required.");
  }
  if (!offerTitle) {
    throw new Error("Discount or benefit title is required.");
  }
  if (!offerDetails) {
    throw new Error("Offer mechanics are required.");
  }

  const authorizedToApply = cleanBoolean(record.authorizedToApply);
  const informationConfirmed = cleanBoolean(record.informationConfirmed);

  if (!authorizedToApply) {
    throw new Error(
      "The applicant must confirm that they are authorized to submit the application.",
    );
  }
  if (!informationConfirmed) {
    throw new Error(
      "The applicant must confirm that the submitted information is accurate.",
    );
  }

  return {
    establishmentName,
    registeredBusinessName: cleanString(record.registeredBusinessName),
    category,
    redemptionType: cleanRedemptionType(record.redemptionType),
    shortDescription,
    businessAddress: cleanString(record.businessAddress),
    branches: cleanStringArray(record.branches),

    websiteUrl: cleanString(record.websiteUrl),
    onlineStoreUrl: cleanString(record.onlineStoreUrl),
    facebookUrl: cleanString(record.facebookUrl),
    instagramUrl: cleanString(record.instagramUrl),
    logoUrl: cleanString(record.logoUrl),
    coverImageUrl: cleanString(record.coverImageUrl),

    contactName,
    contactPosition: cleanString(record.contactPosition),
    contactEmail,
    contactPhone,

    offerType: cleanOfferType(record.offerType),
    offerTitle,
    discountLabel: cleanString(record.discountLabel),
    offerDetails,
    promoCode: cleanString(record.promoCode),
    minimumPurchase: cleanString(record.minimumPurchase),
    eligibleItems: cleanString(record.eligibleItems),
    exclusions: cleanString(record.exclusions),
    redemptionInstructions: cleanString(record.redemptionInstructions),
    startDate: cleanString(record.startDate),
    endDate: cleanString(record.endDate),

    authorizedToApply,
    marketingConsent: cleanBoolean(record.marketingConsent),
    informationConfirmed,
  };
}

async function readLocalApplications(): Promise<PartnerApplication[]> {
  try {
    const contents = await fs.readFile(LOCAL_DATA_PATH, "utf8");
    return JSON.parse(contents) as PartnerApplication[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function writeLocalApplications(
  applications: PartnerApplication[],
): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_DATA_PATH), { recursive: true });
  await fs.writeFile(
    LOCAL_DATA_PATH,
    JSON.stringify(applications, null, 2),
    "utf8",
  );
}

async function readBlobApplications(): Promise<PartnerApplication[]> {
  try {
    const result = await get(BLOB_PATHNAME, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) return [];

    return (await new Response(result.stream).json()) as PartnerApplication[];
  } catch {
    return [];
  }
}

async function writeBlobApplications(
  applications: PartnerApplication[],
): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(applications, null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    contentType: "application/json",
  });
}

async function saveApplications(applications: PartnerApplication[]) {
  if (isBlobConfigured()) {
    await writeBlobApplications(applications);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Partner applications cannot be saved until a private Vercel Blob store is connected.",
    );
  }

  await writeLocalApplications(applications);
}

function createReferenceNumber() {
  const date = new Date();
  const datePart = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  const randomPart = randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();
  return `FICCI-${datePart}-${randomPart}`;
}

export async function getPartnerApplications() {
  const applications = isBlobConfigured()
    ? await readBlobApplications()
    : await readLocalApplications();

  return applications.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export async function createPartnerApplication(input: unknown) {
  const normalized = normalizePartnerApplicationInput(input);
  const applications = await getPartnerApplications();
  const now = new Date().toISOString();

  const application: PartnerApplication = {
    ...normalized,
    id: randomUUID(),
    referenceNumber: createReferenceNumber(),
    status: "new",
    adminNotes: "",
    createdAt: now,
    updatedAt: now,
  };

  await saveApplications([...applications, application]);
  return application;
}

export async function updatePartnerApplicationReview(
  id: string,
  input: unknown,
) {
  const record = (input && typeof input === "object" ? input : {}) as Record<
    string,
    unknown
  >;
  const applications = await getPartnerApplications();
  const index = applications.findIndex((application) => application.id === id);

  if (index < 0) {
    throw new Error("Partner application was not found.");
  }

  const current = applications[index];
  const updated: PartnerApplication = {
    ...current,
    status: cleanApplicationStatus(record.status),
    adminNotes: cleanString(record.adminNotes),
    updatedAt: new Date().toISOString(),
  };

  applications[index] = updated;
  await saveApplications(applications);
  return updated;
}
