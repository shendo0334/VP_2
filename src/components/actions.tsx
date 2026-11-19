import Link from "next/link";
import { ArrowDown, Instagram, Phone, ShoppingBag } from "lucide-react";
import type { ReactNode } from "react";
import type { IntentEvent } from "@/components/analytics";
import { arDestination, displayPhone, phoneHref, site, whatsappDestination } from "@/lib/content";

type Tone = "primary" | "gold" | "outline" | "light-outline" | "text";

export function ActionLink({ children, href, tone = "primary", intent, content, label }: {
  children: ReactNode;
  href: string;
  tone?: Tone;
  intent?: IntentEvent;
  content?: string;
  label?: string;
}) {
  const attributes = {
    className: `action action--${tone}`,
    "data-intent": intent,
    "data-content": content,
    "aria-label": label,
  };

  return href.startsWith("/") && !href.startsWith("//")
    ? <Link href={href} {...attributes}>{children}</Link>
    : <a href={href} {...attributes}>{children}</a>;
}

export function ShopAction({ tone = "primary", icon = false }: { tone?: Tone; icon?: boolean }) {
  return (
    <ActionLink href={site.SHOP_URL} tone={tone} intent="shop_now_click">
      {icon && <ShoppingBag size={17} aria-hidden="true" />}
      {site.labels.shop}
    </ActionLink>
  );
}

export function SchemesAction() {
  return (
    <ActionLink href="/schemes/" tone="light-outline">
      {site.labels.schemes}
    </ActionLink>
  );
}

export function TryOnAction({ tone = "primary" }: { tone?: Tone }) {
  if (arDestination) {
    return <ActionLink href={arDestination} tone={tone} intent="ar_tryon_click">{site.labels.tryOn}</ActionLink>;
  }
  return <button className={`action action--${tone}`} type="button" disabled>{site.labels.tryOn}</button>;
}

export function PhoneAction({ phone, tone = "text", children }: { phone: string; tone?: Tone; children?: ReactNode }) {
  return (
    <ActionLink href={phoneHref(phone)} tone={tone} intent="click_to_call">
      <Phone size={17} aria-hidden="true" />
      {children ?? displayPhone(phone)}
    </ActionLink>
  );
}

export function InstagramAction({ tone = "text" }: { tone?: Tone }) {
  return (
    <ActionLink href={site.INSTAGRAM_URL} tone={tone} intent="instagram_click">
      <Instagram size={17} aria-hidden="true" /> Instagram
    </ActionLink>
  );
}

export function WhatsAppAction() {
  return whatsappDestination
    ? <ActionLink href={whatsappDestination} tone="outline" intent="whatsapp_click">WhatsApp</ActionLink>
    : null;
}

export function ScrollCue({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} className="scroll-cue"><ArrowDown size={15} aria-hidden="true" />{children}</a>;
}
