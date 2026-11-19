"use client";

import { ActionLink } from "@/components/actions";
import { PageLead } from "@/components/editorial";

export default function RouteError({ reset }: { reset: () => void }) {
  return (
    <PageLead eyebrow="Page unavailable" title="Something went wrong." description="Try loading the page again, or call the showroom for assistance.">
      <button type="button" className="action action--primary" onClick={reset}>Try Again</button>
      <ActionLink href="/contact/" tone="outline">Contact Us</ActionLink>
    </PageLead>
  );
}
