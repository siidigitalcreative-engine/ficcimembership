import type { RedemptionType } from "@/lib/types";

export type ApplicationStatus =
  | "new"
  | "under-review"
  | "approved"
  | "declined";

export type OfferType =
  | "percentage-discount"
  | "fixed-discount"
  | "complimentary-item"
  | "special-rate"
  | "package"
  | "promo-code"
  | "other";

export type PartnerApplication = {
  id: string;
  referenceNumber: string;
  status: ApplicationStatus;

  establishmentName: string;
  registeredBusinessName: string;
  category: string;
  redemptionType: RedemptionType;
  shortDescription: string;
  businessAddress: string;
  branches: string[];

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

  adminNotes: string;
  createdAt: string;
  updatedAt: string;
};

export type PartnerApplicationInput = Omit<
  PartnerApplication,
  | "id"
  | "referenceNumber"
  | "status"
  | "adminNotes"
  | "createdAt"
  | "updatedAt"
>;
