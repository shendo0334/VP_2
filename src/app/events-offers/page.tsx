import { CampaignDirectory } from "@/components/campaign-results";
import { PageLead } from "@/components/editorial";
import { showroomDay } from "@/lib/campaign-status";
import { campaignPreviews } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Events & offers", "Find current VP Gold & Diamonds offers, festival updates and past jewellery campaigns.", "/events-offers/");

export default function EventsPage() {
  return (
    <>
      <PageLead eyebrow="Events & offers" title="Around the showroom." description="Find jewellery festivals, showroom promotions and highlights from past celebrations." />
      <CampaignDirectory entries={campaignPreviews()} buildDay={showroomDay()} />
    </>
  );
}
