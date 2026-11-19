import { ContactBar } from "@/components/contact-bar";
import { PageLead } from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Contact", "Call Vattaparambil Gold & Diamonds, find the Mankada showroom or follow the brand on Instagram.", "/contact/");

export default function ContactPage() {
  return (
    <>
      <PageLead eyebrow="Contact" title="Speak with the showroom." description="Get help with a purchase, enquire about a scheme or plan a visit to Mankada." />
      <div className="content-shell page-section contact-section"><ContactBar /></div>
    </>
  );
}
