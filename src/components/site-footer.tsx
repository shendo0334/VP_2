import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { InstagramAction, PhoneAction, WhatsAppAction } from "@/components/actions";
import { navigation, phones, site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-shell footer-grid">
        <div className="footer-brand">
          <Link className="brand-lockup" href="/">
            <Image className="brand-mark" src="/images/vp-logo.png" width={1080} height={1080} alt={site.brand} />
          </Link>
          <p>Gold, diamond and silver jewellery in Mankada, Malappuram.</p>
        </div>
        <div>
          <h2 className="eyebrow">Explore</h2>
          <nav className="footer-nav" aria-label="Footer navigation">
            {navigation.slice(1).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
        </div>
        <div>
          <h2 className="eyebrow">The showroom</h2>
          <address className="footer-contact">
            <p><MapPin size={17} aria-hidden="true" />{site.SHOWROOM_ADDRESS || site.location}</p>
            {phones.map((phone) => <PhoneAction key={phone} phone={phone} />)}
            <InstagramAction />
            <WhatsAppAction />
          </address>
        </div>
      </div>
      <div className="content-shell footer-bottom">
        <small>© {new Date().getFullYear()} {site.brand}</small>
        <span>Kerala, India</span>
      </div>
    </footer>
  );
}
