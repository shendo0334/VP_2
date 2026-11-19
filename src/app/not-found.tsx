import { ActionLink } from "@/components/actions";
import { PageLead } from "@/components/editorial";

export default function NotFound() {
  return (
    <PageLead eyebrow="Page not found" title="This page has moved." description="Go back to the showroom homepage or get in touch for help.">
      <ActionLink href="/">Back to Home</ActionLink>
      <ActionLink href="/contact/" tone="outline">Contact Us</ActionLink>
    </PageLead>
  );
}
