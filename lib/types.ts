export type RedemptionType = "physical" | "online" | "both";

export type Partner = {
  id: string;
  slug: string;
  name: string;
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
  branches: string[];
  terms: string[];
  startDate: string;
  endDate: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PartnerInput = Omit<
  Partner,
  "id" | "slug" | "createdAt" | "updatedAt"
> & {
  slug?: string;
};
