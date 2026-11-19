export type CampaignStatus = "Unconfirmed" | "Upcoming" | "Live" | "Ended";

type CampaignWindow = {
  status: CampaignStatus;
  approved: boolean;
  startDate: string | null;
  endDate: string | null;
};

const showroomCalendar = new Intl.DateTimeFormat("en", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function isCalendarDate(value: string | null): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function showroomDay(now = new Date()) {
  const parts = showroomCalendar.formatToParts(now);
  return ["year", "month", "day"].map((field) => parts.find(({ type }) => type === field)?.value).join("-");
}

export function campaignStatusOnDay(campaign: CampaignWindow, day: string): CampaignStatus {
  const { approved, startDate, endDate, status } = campaign;
  if (status === "Ended") return "Ended";
  if (!approved || !isCalendarDate(startDate) || !isCalendarDate(endDate) || startDate > endDate) {
    return "Unconfirmed";
  }

  if (day < startDate) return "Upcoming";
  if (day > endDate) return "Ended";
  return "Live";
}

export function campaignStatus(campaign: CampaignWindow, now = new Date()): CampaignStatus {
  return campaignStatusOnDay(campaign, showroomDay(now));
}
