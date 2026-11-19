import { existsSync, readFileSync } from "node:fs";

const readContent = (name) => JSON.parse(readFileSync(new URL(`../src/content/${name}.json`, import.meta.url), "utf8"));
const { campaigns, collections, schemes, site } = Object.fromEntries(
  ["campaigns", "collections", "schemes", "site"].map((name) => [name, readContent(name)]),
);
const problems = [];
const check = (condition, message) => { if (!condition) problems.push(message); };
const isString = (value) => typeof value === "string" && value.trim().length > 0;

function httpsUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && !url.username && !url.password) return url;
  } catch {
    return null;
  }
  return null;
}

function checkImage(value, owner) {
  check(isString(value.alt), `${owner} needs image alt text`);
  check(/^\/images\/[a-zA-Z0-9][a-zA-Z0-9/_-]*\.(webp|avif|png|jpe?g)$/i.test(value.image ?? "") &&
    existsSync(new URL(`../public${value.image}`, import.meta.url)), `${owner} image is missing from public/images`);
}

function checkSlugs(values, owner) {
  check(values.every((value) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)), `${owner} needs lowercase URL slugs`);
  check(new Set(values).size === values.length, `${owner} needs unique slugs`);
}

function isDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

for (const key of ["SHOP_URL", "INSTAGRAM_URL"]) {
  check(httpsUrl(site[key]), `${key} must be an HTTPS URL`);
}
for (const key of ["AR_TRYON_URL", "MAP_URL", "SITE_URL"]) {
  check(site[key] === "" || httpsUrl(site[key]), `${key} must be empty or an HTTPS URL`);
}
if (site.SITE_URL) {
  const url = httpsUrl(site.SITE_URL);
  check(url?.pathname === "/" && !url.search && !url.hash, "SITE_URL must be the production origin without a path or query");
}
for (const key of ["PHONE_PRIMARY", "PHONE_SECONDARY"]) {
  check(/^\d{10}$/.test(site[key]), `${key} needs a ten-digit Indian number`);
}
check(site.WHATSAPP_PHONE === "" || /^\d{10}$/.test(site.WHATSAPP_PHONE), "WHATSAPP_PHONE must be empty or a ten-digit Indian number");
check(Object.values(site.labels).every(isString), "CTA labels must contain readable text");

checkSlugs(campaigns.map(({ slug }) => slug), "Each campaign");
checkSlugs(collections.map(({ slug }) => slug), "Each collection");
checkSlugs(Object.values(schemes).map(({ id }) => id), "Each scheme");

for (const campaign of campaigns) {
  const title = campaign.title || campaign.slug;
  check([campaign.title, campaign.summary, campaign.description].every(isString), `${title} needs a title, summary and description`);
  check(["Live", "Upcoming", "Ended", "Unconfirmed"].includes(campaign.status), `${title} has an unknown status`);
  check(typeof campaign.approved === "boolean", `${title} needs an explicit approval setting`);
  check(Array.isArray(campaign.terms) && campaign.terms.every(isString), `${title} terms must be a list of readable strings`);
  if ((campaign.approved && campaign.status !== "Ended") || campaign.startDate || campaign.endDate) {
    check(isDate(campaign.startDate) && isDate(campaign.endDate) && campaign.startDate <= campaign.endDate, `${title} needs a valid date range`);
  }
  checkImage(campaign, title);
  if (campaign.creative) checkImage(campaign.creative, `${title} creative`);
}
for (const collection of collections) checkImage(collection, collection.title);
for (const scheme of Object.values(schemes)) {
  checkImage(scheme, scheme.title);
  if (scheme.creative) checkImage(scheme.creative, `${scheme.title} creative`);
}
check(schemes.advanceBooking.plans.map(({ name }) => name).join(",") === "AGB1,AGB2,AGB3", "Advance booking needs AGB1, AGB2 and AGB3");
for (const plan of schemes.advanceBooking.plans) {
  check(Array.isArray(plan.terms) && (!plan.approved || plan.terms.length > 0) && plan.terms.every(isString), `${plan.name} needs readable terms before approval`);
}
check(!schemes.goldPurchase.approved || (isString(schemes.goldPurchase.headlineMl) && schemes.goldPurchase.termsMl.length > 0 &&
  schemes.goldPurchase.termsMl.every(isString)), "Gold Purchase needs a headline and terms before approval");

if (problems.length) {
  console.error(problems.map((problem) => `- ${problem}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${campaigns.length} campaigns, ${collections.length} collections, ${Object.keys(schemes).length} schemes and site settings.`);
}
