import { notFound } from "next/navigation";
import { ActionLink, PhoneAction } from "@/components/actions";
import { TimedCampaignBadge } from "@/components/campaign-results";
import { EditorialImage } from "@/components/editorial";
import { showroomDay } from "@/lib/campaign-status";
import { campaignDates, campaignPreviews, campaigns, site } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return campaigns.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const campaign = campaigns.find((entry) => entry.slug === slug);
  if (!campaign) notFound();
  return pageMetadata(campaign.title, campaign.summary, `/events-offers/${slug}/`, campaign.image);
}

export default async function CampaignPage({ params }: Props) {
  const { slug } = await params;
  const campaign = campaigns.find((entry) => entry.slug === slug);
  const preview = campaignPreviews().find((entry) => entry.slug === slug);
  if (!campaign || !preview) notFound();
  const dates = campaignDates(campaign);
  const creative = campaign.approved ? campaign.creative : null;

  return (
    <article className="content-shell campaign-detail">
      <ActionLink href="/events-offers/" tone="text">All Events &amp; Offers</ActionLink>
      <div className="campaign-detail__grid">
        <EditorialImage {...(creative ?? campaign)} sizes="(min-width: 760px) 47vw, 100vw" className={creative ? "campaign-detail__poster" : ""} />
        <div className="campaign-detail__copy">
          <TimedCampaignBadge campaign={preview} buildDay={showroomDay()} />
          <h1>{campaign.title}</h1>
          {dates && <p className="campaign-date">{dates}</p>}
          <p>{campaign.description}</p>
          {campaign.approved && campaign.terms.length > 0 && (
            <div className="scheme-terms">
              <h2>Campaign terms</h2>
              <ul>{campaign.terms.map((term) => <li key={term}>{term}</li>)}</ul>
            </div>
          )}
          <PhoneAction tone="primary" phone={site.PHONE_PRIMARY}>{site.labels.enquire}</PhoneAction>
        </div>
      </div>
    </article>
  );
}
