import campaignData from "@/content/campaigns.json";
import collections from "@/content/collections.json";
import schemes from "@/content/schemes.json";
import site from "@/content/site.json";
import { isCalendarDate, type CampaignStatus } from "@/lib/campaign-status";

export type Creative = { image: string; alt: string };

export type Campaign = Omit<(typeof campaignData)[number], "status" | "creative" | "startDate" | "endDate" | "terms"> & {
  status: CampaignStatus;
  creative: Creative | null;
  startDate: string | null;
  endDate: string | null;
  archiveLabel: string | null;
  terms: string[];
};

export type Collection = (typeof collections)[number];
export const campaigns = campaignData as Campaign[];
export type CampaignPreview = Omit<Campaign, "description" | "terms">;

export function campaignPreviews(): CampaignPreview[] {
  return campaigns.map(({ slug, title, summary, image, alt, creative, status, approved, startDate, endDate, archiveLabel }) => ({
    slug, title, summary, image, alt, status, approved, archiveLabel,
    creative: approved ? creative : null,
    startDate: approved ? startDate : null,
    endDate: approved ? endDate : null,
  }));
}
export { collections, site };
type SchemeWithCreative<Content> = Omit<Content, "creative"> & { creative: Creative | null };

export const schemeContent: {
  goldPurchase: SchemeWithCreative<typeof schemes.goldPurchase>;
  advanceBooking: Omit<SchemeWithCreative<typeof schemes.advanceBooking>, "plans"> & {
    plans: { name: string; approved: boolean; terms: string[] }[];
  };
  goldExchange: SchemeWithCreative<typeof schemes.goldExchange>;
} = schemes;

export const navigation = [
  ["Home", "/"],
  ["Shop", "/shop/"],
  ["Collections", "/collections/"],
  ["Schemes", "/schemes/"],
  ["Events & Offers", "/events-offers/"],
  ["AR Try-On", "/ar-try-on/"],
  ["About Us", "/about/"],
  ["Contact", "/contact/"],
] as const;

export const phones = [site.PHONE_PRIMARY, site.PHONE_SECONDARY];

export function phoneHref(phone: string) {
  return `tel:+91${phone}`;
}

export function displayPhone(phone: string) {
  return `${phone.slice(0, 5)} ${phone.slice(5)}`;
}

export function httpsDestination(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? value : "";
  } catch {
    return "";
  }
}

export const arDestination = httpsDestination(site.AR_TRYON_URL);
export const mapDestination = httpsDestination(site.MAP_URL);
export const whatsappDestination = /^\d{10}$/.test(site.WHATSAPP_PHONE)
  ? `https://wa.me/91${site.WHATSAPP_PHONE}`
  : "";

const dateFormat = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "UTC" });

export function campaignDates(campaign: CampaignPreview) {
  if (campaign.approved && isCalendarDate(campaign.startDate) && isCalendarDate(campaign.endDate) && campaign.startDate <= campaign.endDate) {
    return dateFormat.formatRange(
      new Date(`${campaign.startDate}T00:00:00Z`),
      new Date(`${campaign.endDate}T00:00:00Z`),
    );
  }
  return campaign.archiveLabel ?? "";
}
