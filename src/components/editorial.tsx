import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, CirclePlus } from "lucide-react";
import type { ReactNode } from "react";
import { ActionLink } from "@/components/actions";
import { Reveal } from "@/components/reveal";
import type { CampaignStatus } from "@/lib/campaign-status";
import { campaignDates, type CampaignPreview, type Collection, type Creative, site } from "@/lib/content";

export function SectionHeading({ eyebrow, title, children, id }: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow"><span />{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {children && <p className="section-heading__description">{children}</p>}
    </div>
  );
}

export function PageLead({ eyebrow, title, description, children }: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-lead outer-shell">
      <div className="content-shell">
        <p className="eyebrow"><span />{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-lead__description">{description}</p>
        {children && <div className="actions-row">{children}</div>}
      </div>
    </section>
  );
}

export function EditorialImage({ image, alt, sizes, className = "" }: Creative & { sizes: string; className?: string }) {
  return (
    <div className={`editorial-image ${className}`}>
      <Image src={image} alt={alt} fill sizes={sizes} />
    </div>
  );
}

export function CollectionCard({ collection, index, inNavigation = false }: { collection: Collection; index: number; inNavigation?: boolean }) {
  const Label = inNavigation ? "span" : "h3";
  return (
    <Reveal delay={index * 0.06}>
      <Link className="collection-card" href={`/collections/#${collection.slug}`}>
        <EditorialImage image={collection.image} alt={collection.alt} sizes="(min-width: 1024px) 25vw, 50vw" />
        <div className="collection-card__label">
          <Label className="collection-card__title">{collection.title}</Label>
          <span className="round-icon" aria-hidden="true"><ArrowUpRight size={19} /></span>
        </div>
      </Link>
    </Reveal>
  );
}

export function SchemeCard({ id, title, summary }: { id: string; title: string; summary: string }) {
  return (
    <article className="scheme-card">
      <Link href={`/schemes/#${id}`}>
        <div><h3>{title}</h3><p>{summary}</p></div>
        <CirclePlus size={26} strokeWidth={1.3} aria-hidden="true" />
      </Link>
    </article>
  );
}

export function CampaignBadge({ status }: { status: CampaignStatus }) {
  return <span className={`campaign-badge campaign-badge--${status.toLowerCase()}`}>
    {status === "Unconfirmed" ? "Dates unconfirmed" : status}
  </span>;
}

export function CampaignCard({ campaign, status }: { campaign: CampaignPreview; status: CampaignStatus }) {
  const dates = campaignDates(campaign);
  const visual = campaign.approved && campaign.creative ? campaign.creative : campaign;

  return (
    <article className="campaign-card">
      <EditorialImage {...visual} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      <div className="campaign-card__content">
        <CampaignBadge status={status} />
        <h3>{campaign.title}</h3>
        {dates && <p className="campaign-date"><CalendarDays size={16} aria-hidden="true" />{dates}</p>}
        <p>{campaign.summary}</p>
        <ActionLink
          tone="text"
          href={`/events-offers/${campaign.slug}/`}
          intent="offer_card_click"
          content={campaign.slug}
          label={`${site.labels.offerDetail} for ${campaign.title}`}
        >
          {site.labels.offerDetail}
        </ActionLink>
      </div>
    </article>
  );
}
