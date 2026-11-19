import { ActionLink, TryOnAction } from "@/components/actions";
import { EditorialImage, SectionHeading } from "@/components/editorial";
import { Reveal } from "@/components/reveal";
import { arDestination } from "@/lib/content";

export function ARFeature({ home = false }: { home?: boolean }) {
  return (
    <section className="ar-feature outer-shell" aria-labelledby="ar-feature-heading">
      <Reveal className="ar-feature__content">
        <SectionHeading eyebrow="AR Try-On" id="ar-feature-heading" title={<>See how it <em>looks on you.</em></>}>
          Preview selected jewellery virtually before visiting the showroom or buying online.
        </SectionHeading>
        <p className="ar-note">
          {arDestination ? "The experience opens on an external platform and may ask for camera permission on supported devices." : "Virtual try-on is currently unavailable."}
        </p>
        <div className="actions-row">
          <TryOnAction tone="gold" />
          {home
            ? !arDestination && <ActionLink href="/ar-try-on/" tone="light-outline">About AR Try-On</ActionLink>
            : <ActionLink href="/contact/" tone="light-outline">Contact the Showroom</ActionLink>}
        </div>
      </Reveal>
      <EditorialImage image="/images/try-on.webp" alt="Profile of a woman wearing a diamond drop earring" sizes="(min-width: 760px) 50vw, 100vw" className="ar-feature__image" />
    </section>
  );
}
