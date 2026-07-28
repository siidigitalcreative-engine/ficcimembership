export const siteConfig = {
  organizationName: process.env.NEXT_PUBLIC_ORGANIZATION_NAME || "FICCI",
  supportEmail:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "membership@ficci.org.ph",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "",
  benefitsDirectoryUrl:
    process.env.NEXT_PUBLIC_BENEFITS_DIRECTORY_URL || "",
  myGlueDownloadUrl:
    process.env.NEXT_PUBLIC_MY_GLUE_DOWNLOAD_URL ||
    "https://www.glueup.com/download-my-glue",
};
