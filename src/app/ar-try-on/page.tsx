import { ARFeature } from "@/components/ar-feature";
import { PageLead } from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("AR Try-On", "Learn about virtual jewellery try-on at Vattaparambil Gold & Diamonds.", "/ar-try-on/", "/images/try-on.webp");

export default function ARPage() {
  return (
    <>
      <PageLead eyebrow="Virtual jewellery preview" title="AR Try-On" description="See how selected pieces could look on you before you visit or shop." />
      <div className="inner-feature"><ARFeature /></div>
    </>
  );
}
