import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const site = JSON.parse(read("src/content/site.json"));
const campaigns = JSON.parse(read("src/content/campaigns.json"));
const routes = ["", "shop/", "collections/", "schemes/", "events-offers/", "ar-try-on/", "about/", "contact/"];
routes.push(...campaigns.map(({ slug }) => `events-offers/${slug}/`));
const titles = new Set();

for (const route of routes) {
  const html = read(`out/${route}index.html`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `/${route} has a unique title`);
  titles.add(title);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `/${route} has one H1`);
  assert.match(html, /<meta name="description" content="[^"]+"/, `/${route} has a description`);
  assert.match(html, /<meta property="og:title" content="[^"]+"/, `/${route} has an Open Graph title`);
  assert.match(html, /<meta property="og:description" content="[^"]+"/, `/${route} has an Open Graph description`);
  if (site.SITE_URL) {
    const socialImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    assert.ok(socialImage && new URL(socialImage).origin === new URL(site.SITE_URL).origin, `/${route} uses the production origin for its social image`);
  }
  assert.doesNotMatch(html, /<meta property="og:image" content="http:\/\/localhost/, `/${route} avoids local-only social images`);
  assert.ok(html.includes(`href="${site.SHOP_URL}"`), `/${route} has the configured shop destination`);

  for (const [, dest] of html.matchAll(/(?:href|src)="(\/(?:images|_next)\/[^"]+)"/g)) {
    assert.ok(existsSync(new URL(`../out${dest}`, import.meta.url)), `Export has ${dest}`);
  }
}

const contact = read("out/contact/index.html");
for (const phone of [site.PHONE_PRIMARY, site.PHONE_SECONDARY]) {
  assert.ok(contact.includes(`href="tel:+91${phone}"`), `Contact has a call link for ${phone}`);
}
assert.ok(contact.includes(`href="${site.INSTAGRAM_URL}"`), "Contact has the configured Instagram link");

const pageMain = (route) => read(`out/${route}index.html`).match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
const homepage = pageMain("");
for (const campaign of campaigns) {
  if (!campaign.approved || campaign.status === "Ended") {
    assert.ok(!homepage.includes(`href="/events-offers/${campaign.slug}/"`), `${campaign.title} stays out of the current homepage offers`);
  }
  assert.ok(pageMain("events-offers/").includes(`href="/events-offers/${campaign.slug}/"`), `Campaign directory links to ${campaign.title}`);
}
const schemeContent = JSON.parse(read("src/content/schemes.json"));
const schemePage = pageMain("schemes/");
if (!schemeContent.goldPurchase.approved) {
  assert.ok(!schemePage.includes(schemeContent.goldPurchase.headlineMl), "Unapproved Gold Purchase terms stay out of the export");
}
for (const { id } of Object.values(schemeContent)) {
  assert.ok(schemePage.includes(`id="${id}"`), `Scheme page has detail section ${id}`);
}

if (!site.AR_TRYON_URL) {
  assert.match(read("out/ar-try-on/index.html"), /<button[^>]+disabled[^>]*>[^<]+<\/button>/, "AR link is disabled without a destination");
}
if (!site.SITE_URL) assert.match(read("out/robots.txt"), /Disallow: \//, "Unconfigured draft disallows indexing");
assert.match(read("out/404.html"), /This page has moved/, "Export has a branded 404");
console.log(`Verified ${routes.length} static pages, assets, metadata, schemes, campaigns, contact links, AR availability and 404.`);
