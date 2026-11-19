# VP Gold & Diamonds components

| Component | Responsibility |
| --- | --- |
| `SiteHeader` | Logo, route-aware navigation, persistent Shop Now action, and mobile disclosure with Escape support |
| `SiteFooter` | Reusable showroom contact, footer navigation and brand mark |
| `ActionLink` | Internal navigation and external anchors, with shared visual variants and optional intent tracking |
| `ShopAction`, `TryOnAction`, `PhoneAction` | Configured destinations and availability for primary customer actions |
| `PageLead`, `SectionHeading` | Consistent semantic H1 and H2 composition with optional supporting copy |
| `EditorialImage` | Sized, lazy-loaded local images with alternative text |
| `CollectionCard` | Visual collection link for the homepage and the collection jump navigation |
| `SchemeCard`, `SchemeDetail` | Home preview and anchored scheme detail sections |
| `CampaignCard`, `CampaignDirectory`, `CurrentOffers` | Status, dates and creative treatment for the campaign directory and home |
| `ARFeature` | Virtual try-on photography, availability and camera-permission copy |
| `ContactBar` | Telephone, address, directions, social and optional WhatsApp entry points |
| `Reveal` | Once-per-element section reveal that follows reduced-motion preferences and begins from visible markup |

Use an `ActionLink` for navigation and a real button for an action that keeps the visitor on the page. Place a visible heading in front of content sections. Set `lang="ml"` on known Malayalam passages. The bundled Malayalam font also serves as a fallback for mixed-language copy.

## Analytics

`AnalyticsEvents` listens for activation on annotated links. `SchemeDetailView` reports when each scheme heading enters the viewport. Both dispatch `vp:intent` on `window` with `detail.name` and, where relevant, `detail.content` for a campaign slug or scheme ID.

Event names are `shop_now_click`, `ar_tryon_click`, `scheme_detail_view`, `offer_card_click`, `click_to_call`, `whatsapp_click`, and `instagram_click`. The events contain no phone numbers, personal identifiers, or analytics cookies. Register an analytics adapter after consent configuration is approved.

## Image sources

`public/images/vp-logo.jpg` is copied from the supplied logo. The built-in ImageGen tool produced the editorial assets described below. WebP derivatives are pre-sized for the static host.

| Outputs in `public/images/` | Generation brief |
| --- | --- |
| `hero.webp`, `hero-mobile.webp`, `og.jpg` | Wide jewellery editorial portrait of a Kerala woman in a burgundy sari, with traditional gold jewellery and dark plum fabric to the left for text |
| `gold.webp`, `diamond.webp`, `silver.webp`, `bridal.webp`, `try-on.webp`, `showroom.webp` | Six coordinated scenes featuring gold bangles, diamond rings, silver anklets, bridal necklaces, a diamond earring portrait, and a necklace presented on velvet |

Editorial images illustrate jewellery categories. They do not depict verified inventory or the actual showroom. To replace an image, update both its path and alternative text in the relevant content entry or feature component. Supply a `creative` object with `image` and `alt` for approved campaign and scheme posters.
