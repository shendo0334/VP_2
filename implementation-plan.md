# VP Gold & Diamonds implementation plan

The PRD, supplied logo, and 15.6-second reference recording have been reviewed. Route scope, deployment approach and content policy are in [architecture.md](architecture.md). The visual direction and control behaviour are in [design-system.md](design-system.md).

1. Scaffold Next.js static export, Tailwind, TypeScript, local fonts, and production scripts. Add a build-time smoke check for routes, metadata, content status and outbound destinations.
2. Create editable JSON for the showroom, collections, schemes, campaigns and CTA labels. Implement campaign date/status rules, confirmed-term gates, HTTPS destinations and analytics signals. Keep unverified dates, discounts and scheme terms out of public promotional copy.
3. Build the homepage and shell first. Implement the framed hero, collection gallery, plum scheme panel, campaign area, AR feature and showroom footer. Use the supplied logo and label generated editorial imagery in the asset documentation.
4. Build Shop, Collections, Schemes, Events & Offers, campaign details, AR, About and Contact. Add the route loader, recovery and 404. Check keyboard navigation, accessible headings, Malayalam typography and action links.
5. Start the development server. Capture desktop, tablet and mobile homepage views. Compare the hero, light sections and dark feature panel with the source recording. Refine typography, imagery, spacing and breakpoints. Exercise navigation, reduced motion and the core journeys.
6. Verify the static export, contact actions, metadata and archive behaviour. Record the verification results, external-service limits, and client inputs needed for production release. Update README and component documentation.

## Acceptance scenarios

- The home and all core routes return HTML, use a unique page title and contain a single primary heading.
- Shop actions use the exact PRD URL in the same tab. Both phone numbers and the supplied Instagram profile are available.
- AR has an unavailable state until a valid HTTPS URL is configured. Optional WhatsApp and exact directions stay absent pending confirmation.
- A campaign without approval or confirmed dates stays out of the current home slot. Approved campaigns stop showing as current after their end day in Asia/Kolkata.
- All eight desktop destinations are reachable on mobile, and the disclosure can be opened and dismissed from the keyboard.
- At 390, 768 and 1440 px, hero copy and the controls stay within the viewport. Gallery and scheme grids adapt to the available width. Reduced motion keeps all content usable.

## Verification record

Production export, route metadata, asset references, scheme approval, campaign links, configured contact links and the unavailable AR state are checked by the project scripts. The shop and Instagram destinations returned HTTP 200 in direct HTTPS requests. The Next.js dev server served the homepage with HTTP 200.

Browser preview access was declined. Desktop, tablet and mobile captures and interactive browser checks remain pending. The rollout also depends on the client inputs in [README.md](README.md).
