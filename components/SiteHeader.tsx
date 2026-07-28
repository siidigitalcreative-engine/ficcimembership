import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="site-header no-print">
      <div className="container header-inner">
        <Link
          className="brand"
          href="/"
          aria-label={`${siteConfig.organizationName} benefits home`}
        >
          <span className="brand-mark" aria-hidden="true">
            F
          </span>
          <span>
            <strong>{siteConfig.organizationName}</strong>
            <small>Membership Benefits</small>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/partners">Partners</Link>
          <Link href="/guide">Member Guide</Link>
          <Link href="/apply">Become a Partner</Link>
          <a
            href={siteConfig.glueUpProgramUrl}
            target="_blank"
            rel="noreferrer"
          >
            Glue Up Program
          </a>
          <Link className="nav-admin" href="/admin">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
