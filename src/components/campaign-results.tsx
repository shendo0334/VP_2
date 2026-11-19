"use client";

import { useSyncExternalStore } from "react";
import { ActionLink } from "@/components/actions";
import { CampaignBadge, CampaignCard, SectionHeading } from "@/components/editorial";
import { Reveal } from "@/components/reveal";
import { campaignStatusOnDay, showroomDay, type CampaignStatus } from "@/lib/campaign-status";
import { site, type CampaignPreview } from "@/lib/content";

function subscribeToShowroomDay(onChange: () => void) {
  let timer: ReturnType<typeof setTimeout>;

  function schedule() {
    clearTimeout(timer);
    onChange();
    const midnight = new Date(`${showroomDay()}T00:00:00+05:30`).getTime();
    timer = setTimeout(schedule, midnight + 86_400_000 - Date.now() + 100);
  }

  schedule();
  document.addEventListener("visibilitychange", schedule);
  return () => {
    clearTimeout(timer);
    document.removeEventListener("visibilitychange", schedule);
  };
}

function useShowroomDay(buildDay: string) {
  return useSyncExternalStore(subscribeToShowroomDay, showroomDay, () => buildDay);
}

const sections: { status: CampaignStatus; title: string; id: string }[] = [
  { status: "Live", title: "Current offers", id: "current" },
  { status: "Upcoming", title: "Coming up", id: "upcoming" },
  { status: "Unconfirmed", title: "Campaign highlights", id: "highlights" },
  { status: "Ended", title: "Campaign archive", id: "archive" },
];

type ResultsProps = { entries: CampaignPreview[]; buildDay: string };

export function CurrentOffers({ entries, buildDay }: ResultsProps) {
  const day = useShowroomDay(buildDay);
  const live = entries.filter((campaign) => campaignStatusOnDay(campaign, day) === "Live").slice(0, 3);

  return (
    <section className="content-shell page-section" aria-labelledby="events-heading">
      <Reveal className="section-heading-row">
        <SectionHeading eyebrow="Events & offers" id="events-heading" title={<>Around the <em>showroom.</em></>}>
          {live.length ? "Explore what’s on now at Vattaparambil Gold & Diamonds." : "Browse festival highlights and look back at past jewellery campaigns."}
        </SectionHeading>
        <ActionLink href="/events-offers/" tone="outline">{site.labels.offers}</ActionLink>
      </Reveal>
      {live.length > 0 && <div className="campaign-grid">
        {live.map((campaign) => <CampaignCard key={campaign.slug} campaign={campaign} status="Live" />)}
      </div>}
    </section>
  );
}

export function CampaignDirectory({ entries, buildDay }: ResultsProps) {
  const day = useShowroomDay(buildDay);
  const cards = entries.map((campaign) => ({ campaign, status: campaignStatusOnDay(campaign, day) }));

  return (
    <div className="content-shell campaign-sections">
      {sections.map(({ status, id, title }) => {
        const matching = cards.filter((card) => card.status === status);
        if (!matching.length && status !== "Live") return null;
        return (
          <section key={id} id={id} className="campaign-section" aria-labelledby={`${id}-heading`}>
            <SectionHeading id={`${id}-heading`} title={title} />
            {matching.length > 0
              ? <div className="campaign-grid">{matching.map((card) => <CampaignCard key={card.campaign.slug} {...card} />)}</div>
              : <div className="notice-panel"><p>There are no confirmed live offers at the moment.</p><ActionLink href="/contact/" tone="text">Ask the Showroom</ActionLink></div>}
          </section>
        );
      })}
    </div>
  );
}

export function TimedCampaignBadge({ campaign, buildDay }: { campaign: CampaignPreview; buildDay: string }) {
  const day = useShowroomDay(buildDay);
  return <CampaignBadge status={campaignStatusOnDay(campaign, day)} />;
}
