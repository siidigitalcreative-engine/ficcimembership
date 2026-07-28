export const siteConfig = {
  organizationName: process.env.NEXT_PUBLIC_ORGANIZATION_NAME || "FICCI",
  programName:
    process.env.NEXT_PUBLIC_PROGRAM_NAME ||
    "Membership Discount Benefits Program",
  supportEmail:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "membership@ficci.org.ph",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+63 917 632 5107",
  benefitsDirectoryUrl:
    process.env.NEXT_PUBLIC_BENEFITS_DIRECTORY_URL || "/partners",
  myGlueDownloadUrl:
    process.env.NEXT_PUBLIC_MY_GLUE_DOWNLOAD_URL ||
    "https://www.glueup.com/download-my-glue",
  glueUpProgramUrl:
    process.env.NEXT_PUBLIC_GLUEUP_PROGRAM_URL ||
    "https://app.glueup.com/event/membership-discount-benefits-program-177531/",
  programStartDate: process.env.NEXT_PUBLIC_PROGRAM_START_DATE || "2026-04-06",
  programEndDate: process.env.NEXT_PUBLIC_PROGRAM_END_DATE || "2027-02-28",
};
