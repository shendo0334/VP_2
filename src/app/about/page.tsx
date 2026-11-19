import { ActionLink } from "@/components/actions";
import { EditorialImage, PageLead, SectionHeading } from "@/components/editorial";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("About the showroom", "Get to know Vattaparambil Gold & Diamonds, a jewellery showroom in Mankada, Malappuram.", "/about/");

export default function AboutPage() {
  return (
    <>
      <PageLead eyebrow="About us" title={site.brand} description="A jewellery showroom for everyday pieces, gifts and celebrations in Mankada, Malappuram." />
      <section className="content-shell about-grid" aria-labelledby="about-showroom">
        <EditorialImage image="/images/showroom.webp" alt="Hands presenting a traditional gold necklace on velvet" sizes="(min-width: 760px) 50vw, 100vw" />
        <Reveal className="about-grid__copy">
          <SectionHeading eyebrow="Our showroom" id="about-showroom" title={<>Take your time <em>choosing.</em></>} />
          <p>See how a necklace sits, compare the weight of bangles, or bring an outfit when you’re choosing wedding jewellery. We’ll help you explore gold, diamond and silver pieces and answer questions about the schemes available to you.</p>
          <ActionLink href="/contact/">Contact the Showroom</ActionLink>
        </Reveal>
      </section>
    </>
  );
}
