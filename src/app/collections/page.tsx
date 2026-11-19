import { ActionLink, ShopAction } from "@/components/actions";
import { CollectionCard, EditorialImage, PageLead } from "@/components/editorial";
import { Reveal } from "@/components/reveal";
import { collections } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Jewellery collections", "Discover gold, diamonds, silver and bridal jewellery at Vattaparambil Gold & Diamonds in Mankada, Malappuram.", "/collections/");

export default function CollectionsPage() {
  return (
    <>
      <PageLead eyebrow="The collections" title="Find your kind of shine." description="Explore jewellery for giving, celebrating and wearing every day.">
        <ShopAction />
      </PageLead>
      <div className="content-shell collection-page">
        <nav className="collection-grid" aria-label="Jump to a collection">
          {collections.map((collection, index) => <CollectionCard key={collection.slug} collection={collection} index={index} inNavigation />)}
        </nav>
        <p className="asset-caption">Jewellery imagery is illustrative. Ask the showroom about current availability.</p>
        <div className="collection-detail-stack">
          {collections.map((collection) => (
            <section key={collection.slug} id={collection.slug} className="collection-detail" aria-labelledby={`${collection.slug}-title`}>
              <EditorialImage image={collection.image} alt={collection.alt} sizes="(min-width: 760px) 50vw, 100vw" />
              <Reveal className="collection-detail__copy">
                <h2 id={`${collection.slug}-title`}>{collection.title}</h2>
                <p>{collection.description}</p>
                <ActionLink href="/contact/" tone="text" label={`Ask the showroom about ${collection.title}`}>Ask the Showroom</ActionLink>
              </Reveal>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
