# VP Gold & Diamonds

A static marketing website for Vattaparambil Gold & Diamonds in Mankada, Malappuram. It covers the showroom, jewellery collections, gold schemes, festival campaigns, and outbound shop and AR hand-offs.

## Development

Use Node.js 22 or later and npm.

```sh
npm ci
npm run dev
```

Open [the development site](http://localhost:3000). For a production export, run:

```sh
npm test
npm run typecheck
npm run build
npm run verify:export
```

The build validates the editable content and exports the site to `out/`. It uses Next.js’s Webpack build and serializes filesystem operations on Windows to avoid directory-write races on workspace mounts. Upload `out/` to a static host that serves directory indexes, preserves trailing slashes, and uses `404.html` for missing pages.

## Content updates

| File | What to edit |
| --- | --- |
| `src/content/site.json` | Shop and social URLs, phones, CTA labels, AR, optional directions, address, hours and production origin |
| `src/content/collections.json` | Collection names, descriptions, images and alternative text |
| `src/content/schemes.json` | Scheme descriptions, approved terms, AGB plans and optional creatives |
| `src/content/campaigns.json` | Campaign copy, approved dates, images, terms, status and archive labels |

Use `YYYY-MM-DD` dates and add images under `public/images/`. To publish a campaign, supply approved copy, set `approved` to `true`, and enter both dates. The showroom calendar uses Asia/Kolkata. Once the browser loads, it refreshes the status at local midnight and when the tab regains visibility. Set `status` to `Ended` to explicitly archive a campaign. Unconfirmed campaigns can appear as highlights but remain outside the current offers on the homepage. Save each content change and rebuild to deploy it. Rebuild at scheduled boundaries if the initial HTML served to crawlers and visitors with JavaScript disabled also needs day-current status.

Leave optional integration fields empty while they are pending. Use an approved HTTPS URL for AR and directions, and a ten-digit Indian number for WhatsApp. The shop opens in the same tab. The shop hand-off page provides a phone fallback for service outages. The host has no access to the external session or its errors after redirection.

## Production hand-off

- Set `SITE_URL` to the confirmed production HTTPS origin. A rebuild adds canonical URLs, absolute Open Graph images and a sitemap, and enables indexing.
- Supply the approved higher-resolution logo, jewellery and showroom photography, and the original scheme and campaign creatives. The current build uses the supplied 150 × 150 logo and illustrative editorial photography.
- Confirm public phone numbers, the exact address and map pin, opening hours, and which number supports WhatsApp. Configure the approved AR platform URL when available.
- Verify scheme benefits, payment rules, eligibility and cancellation terms before enabling them. Confirm campaign dates and terms, including prize details, eligibility and association wording for Swarnotsavam. Keep the 2025 Onam campaign archived unless the business gives it a different editorial treatment.
- The site emits a `vp:intent` browser event. Connect a reporting provider after the analytics and consent configuration is approved.

See [architecture](architecture.md), [design system](design-system.md), [components](components.md), and [implementation plan](implementation-plan.md).
