import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} {siteConfig.organizationName}. {siteConfig.programName}.</p>
        <p>Offers are subject to each partner’s terms, validity, and availability.</p>
      </div>
    </footer>
  );
}
