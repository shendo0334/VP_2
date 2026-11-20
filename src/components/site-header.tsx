"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ShopAction } from "@/components/actions";
import { navigation, site } from "@/lib/content";

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const current = pathname.replace(/\/$/, "") || "/";
  return navigation.map(([title, href]) => {
    const route = href.replace(/\/$/, "") || "/";
    const active = route === current || (route !== "/" && current.startsWith(`${route}/`));
    return (
      <Link key={href} href={href} aria-current={active ? (route === current ? "page" : "location") : undefined} onClick={onNavigate}>
        {title}
      </Link>
    );
  });
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuRoute, setMenuRoute] = useState<string | null>(null);
  const open = menuRoute === pathname;
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuRoute(null);
      menuButton.current?.focus();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand-lockup" href="/" onClick={() => setMenuRoute(null)}>
          <Image className="brand-mark" src="/images/vp-logo.png" width={1080} height={1080} alt={site.brand} preload />
          <span className="sr-only">Home</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavLinks pathname={pathname} />
        </nav>
        <div className="header-actions">
          <ShopAction icon />
          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls="mobile-navigation"
            aria-expanded={open}
            onClick={() => setMenuRoute(open ? null : pathname)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label={site.brand + " mobile navigation"} hidden={!open}>
        <NavLinks pathname={pathname} onNavigate={() => setMenuRoute(null)} />
      </nav>
    </header>
  );
}
