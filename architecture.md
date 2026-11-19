# VP Gold & Diamonds architecture

## Brief and reference

The site is a showroom and campaign guide for regional buyers around Mankada, Perinthalmanna and Malappuram. Wedding and festive shoppers can discover collections. Families can compare schemes and call the showroom. Mobile visitors can reach the online shop and, once available, the external AR experience.

The 15.6-second reference starts with photography contained in a lightly rounded frame. Around 0:02 the scroll opens onto a white section with asymmetric text placement. A coloured panel introduces service rows around 0:04, followed by lighter modular cards around 0:07 and a full-image call to action around 0:09. The VP site uses these changes in scale and surface for its hero, collection gallery, scheme panel, campaign cards, and AR feature. Its layouts, imagery, copy and type are original to the jewellery brief.

## Stack and trade-offs

Use Next.js App Router with static export, React, strict TypeScript, and Tailwind CSS 4. This matches the requested component stack and keeps deployment portable. Astro would simplify partial hydration further, while a server-backed Next deployment would add request-time publishing and redirects. The PRD calls for an editable static site, so JSON changes take effect on rebuild. CSS handles state and initial hero motion. Motion handles in-view choreography. Lucide supplies functional interface icons.

## Routes

| Route | Content and actions |
| --- | --- |
| / | Framed hero, shop and scheme actions, showroom context, four collection tiles, two featured schemes, current campaign slot, AR feature, contact footer |
| /shop/ | External-shop transition, direct same-tab action, help by phone |
| /collections/ | Gold, Diamond, Silver, and Wedding / Bridal gallery with section links and shop handoff |
| /schemes/ | Gold Purchase, three AGB plans, Gold Exchange, scheme anchor links and enquiry actions |
| /events-offers/ | Current, upcoming and archive sections, dates and statuses when supported, campaign details |
| /events-offers/[slug]/ | Prebuilt standalone campaign detail pages |
| /ar-try-on/ | AR explanation, device permission note and configurable action |
| /about/ | Showroom introduction, location context and editorial imagery |
| /contact/ | Two click-to-call numbers, Instagram, optional WhatsApp and directions |

## Data and release behaviour

`src/content/site.json` supplies contact information, destinations, CTA labels and optional deployment metadata. `schemes.json`, `campaigns.json` and `collections.json` supply editable catalogue content. Compile-time types and a build-time content check protect those interfaces. Campaign eligibility requires explicit approval and a valid confirmed window, evaluated in Asia/Kolkata. The initial HTML uses the export day. Hydrated campaign views update on local midnight and when visitors return to the tab. Known historical campaigns go in the archive. Campaigns with unverified dates or terms use restrained informational copy and carry no promotional eligibility claims. The home lists only campaigns currently eligible. Gold Purchase approval unlocks public commercial details. AGB plans expose approved terms per plan. Optional URLs are HTTPS and absent by default. Phone enquiries remain available from the marketing site.

Route metadata includes unique titles and descriptions. A configured production origin enables absolute Open Graph images, canonical URLs, the production sitemap and indexing. Analytics emits local, non-identifying intent events through a shared client module. The analytics provider and consent flow depend on client approval. The draft ships with no provider and no analytics cookies.

Static server components own route content and assets. Keep interactivity in the mobile navigation, reveal effects, action links and tracked detail views. Provide a route loader, render error recovery and a branded 404. Build output goes to `out/`. The client chooses the production host after approval of business inputs and assets.

## Source material

- [Static export guide](https://nextjs.org/docs/app/guides/static-exports)
- [Tailwind CSS Next.js setup](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
