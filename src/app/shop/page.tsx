import { ActionLink, PhoneAction, ShopAction } from "@/components/actions";
import { EditorialImage } from "@/components/editorial";
import { site } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Shop jewellery online", "Visit the Vattaparambil Gold & Diamonds online jewellery shop or call the Mankada showroom for help.", "/shop/");

export default function ShopPage() {
  return (
    <section className="feature-page outer-shell">
      <div className="feature-page__copy">
        <p className="eyebrow"><span />The online shop</p>
        <h1>Explore our jewellery <em>online.</em></h1>
        <p>Continue to our jewellery platform to sign in and browse the online collection.</p>
        <div className="actions-row"><ShopAction tone="gold" icon /><ActionLink href="/collections/" tone="light-outline">View Collections</ActionLink></div>
        <div className="feature-page__help">
          <p>If the online shop is unavailable, call the showroom for help.</p>
          <PhoneAction phone={site.PHONE_PRIMARY} />
        </div>
      </div>
      <EditorialImage image="/images/gold.webp" alt="Pair of intricately worked gold bangles" sizes="(min-width: 760px) 50vw, 100vw" />
    </section>
  );
}
