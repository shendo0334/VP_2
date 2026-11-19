import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ActionLink, SchemesAction, ScrollCue, ShopAction } from "@/components/actions";
import { ARFeature } from "@/components/ar-feature";
import { CurrentOffers } from "@/components/campaign-results";
import { CollectionCard, EditorialImage, SchemeCard, SectionHeading } from "@/components/editorial";
import { Reveal } from "@/components/reveal";
import { showroomDay } from "@/lib/campaign-status";
import { campaignPreviews, collections, schemeContent, site } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Vattaparambil Gold & Diamonds | Gold, Diamond & Silver Jewellery",
  "Explore jewellery collections, gold purchase schemes, advance booking plans and offers from Vattaparambil Gold & Diamonds in Mankada.",
  "/",
);

export default function HomePage() {
  return (
    <>
      <section className="home-hero outer-shell" aria-labelledby="home-title">
        <picture className="home-hero__picture">
          <source media="(max-width: 639px)" srcSet="/images/hero-mobile.webp" />
          <Image
            src="/images/hero.webp"
            alt="A woman wearing Kerala bridal gold jewellery with a burgundy silk sari"
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <div className="hero-shade" />
        <div className="home-hero__inner">
          <div className="hero-copy">
            <p className="eyebrow hero-enter"><span />Vattaparambil Gold &amp; Diamonds</p>
            <h1 id="home-title" className="hero-enter">Jewellery for the<br className="hero-break" /> moments <em>you keep.</em></h1>
            <p className="hero-copy__description hero-enter">Gold, diamond and silver jewellery for everyday rituals and life’s biggest celebrations.</p>
            <div className="actions-row hero-enter"><ShopAction tone="gold" /> <SchemesAction /></div>
          </div>
          <ScrollCue href="#collections-preview">Discover the collections</ScrollCue>
        </div>
      </section>

      <div className="content-shell showroom-bar">
        <p><MapPin size={17} strokeWidth={1.7} aria-hidden="true" />{site.location}</p>
        <Link href="/contact/">Visit the showroom <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </div>

      <section id="collections-preview" className="content-shell page-section collections-preview" aria-labelledby="collections-heading">
        <Reveal className="section-heading-row">
          <SectionHeading eyebrow="The collections" id="collections-heading" title={<>Find your kind <em>of shine.</em></>} />
          <ActionLink href="/collections/" tone="outline">Explore Collections</ActionLink>
        </Reveal>
        <div className="collection-grid">
          {collections.map((collection, index) => <CollectionCard key={collection.slug} collection={collection} index={index} />)}
        </div>
      </section>

      <section className="scheme-panel outer-shell" aria-labelledby="schemes-heading">
        <EditorialImage image="/images/showroom.webp" alt="A traditional gold necklace presented on velvet" sizes="(min-width: 850px) 45vw, 100vw" className="scheme-panel__image" />
        <Reveal className="scheme-panel__content">
          <SectionHeading eyebrow="Gold schemes" id="schemes-heading" title={<>Make plans <em>for gold.</em></>}>
            Put something aside for a future purchase, plan ahead for a wedding or ask about exchanging old gold.
          </SectionHeading>
          <div className="scheme-panel__links">
            <SchemeCard {...schemeContent.goldPurchase} />
            <SchemeCard {...schemeContent.advanceBooking} />
          </div>
          <SchemesAction />
        </Reveal>
      </section>

      <CurrentOffers entries={campaignPreviews().filter(({ approved }) => approved)} buildDay={showroomDay()} />

      <ARFeature home />

      <section className="content-shell page-section showroom-intro" aria-labelledby="showroom-heading">
        <Reveal className="showroom-intro__grid">
          <SectionHeading eyebrow="Our showroom" id="showroom-heading" title={<>Come see it <em>in person.</em></>} />
          <div>
            <p>Visit Vattaparambil Gold &amp; Diamonds in Mankada to explore collections, try on jewellery and talk through your next purchase with the showroom team.</p>
            <ActionLink href="/about/" tone="text">About the Showroom</ActionLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
