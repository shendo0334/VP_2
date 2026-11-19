import type { ReactNode } from "react";
import { ActionLink, PhoneAction } from "@/components/actions";
import { SchemeDetailView } from "@/components/analytics";
import { EditorialImage, PageLead } from "@/components/editorial";
import { Reveal } from "@/components/reveal";
import { type Creative, schemeContent, site } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Gold schemes", "Learn about gold purchase, advance gold booking and old gold exchange at Vattaparambil Gold & Diamonds.", "/schemes/");

const { goldPurchase, advanceBooking, goldExchange } = schemeContent;
const schemeList = [goldPurchase, advanceBooking, goldExchange];
const schemeIds = schemeList.map(({ id }) => id);

function SchemeDetail({ id, title, summary, visual, children }: {
  id: string;
  title: string;
  summary: string;
  visual: Creative;
  children: ReactNode;
}) {
  return (
    <section className="scheme-detail" id={id} aria-labelledby={`${id}-title`}>
      <div className="scheme-detail__visual">
        <EditorialImage {...visual} sizes="(min-width: 760px) 40vw, 100vw" />
      </div>
      <Reveal className="scheme-detail__copy">
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{summary}</p>
        {children}
      </Reveal>
    </section>
  );
}

export default function SchemesPage() {
  return (
    <>
      <PageLead eyebrow="Gold schemes" title="Make plans for gold." description="Explore ways to plan your next purchase, book ahead or exchange jewellery you already own." />
      <div className="content-shell schemes-content">
        <nav className="section-jump" aria-label="Jump to a scheme">
          {schemeList.map(({ id, title }) => <a key={id} href={`#${id}`}>{title}</a>)}
        </nav>
        <SchemeDetailView ids={schemeIds} />

        <SchemeDetail {...goldPurchase} visual={(goldPurchase.approved && goldPurchase.creative) || goldPurchase}>
          {goldPurchase.approved
            ? <div lang="ml" className="scheme-terms">
                <p><strong>{goldPurchase.headlineMl}</strong></p>
                <ul>{goldPurchase.termsMl.map((term) => <li key={term}>{term}</li>)}</ul>
              </div>
            : <p lang="ml" className="scheme-language-note">കൂടുതൽ വിവരങ്ങൾക്ക് ഷോറൂമുമായി ബന്ധപ്പെടുക.</p>}
          <p className="legal-note">{goldPurchase.termsNote}</p>
          <PhoneAction tone="primary" phone={site.PHONE_PRIMARY}>{site.labels.enquire}</PhoneAction>
        </SchemeDetail>

        <SchemeDetail {...advanceBooking} visual={(advanceBooking.plans.every((plan) => plan.approved) && advanceBooking.creative) || advanceBooking}>
          <div className="plan-grid">
            {advanceBooking.plans.map((plan) => (
              <article key={plan.name} className="plan-card">
                <h3>{plan.name}</h3>
                {plan.approved && <ul>{plan.terms.map((term) => <li key={term}>{term}</li>)}</ul>}
                <a href="/contact/" aria-label={`${site.labels.planTerms} for ${plan.name}`}>{site.labels.planTerms}</a>
              </article>
            ))}
          </div>
        </SchemeDetail>

        <SchemeDetail {...goldExchange} visual={goldExchange.creative || goldExchange}>
          <p className="legal-note">{goldExchange.termsNote}</p>
          <ActionLink href="/contact/">{goldExchange.cta}</ActionLink>
        </SchemeDetail>
      </div>
    </>
  );
}
