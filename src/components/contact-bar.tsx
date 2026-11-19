import { Instagram, MapPin, Phone } from "lucide-react";
import { ActionLink, InstagramAction, PhoneAction, WhatsAppAction } from "@/components/actions";
import { mapDestination, phones, site } from "@/lib/content";

export function ContactBar() {
  return (
    <div className="contact-grid">
      <section className="contact-card" aria-labelledby="call-heading">
        <Phone size={24} strokeWidth={1.5} aria-hidden="true" />
        <h2 id="call-heading">Call the showroom</h2>
        <p>Ask about collections, schemes or planning a visit.</p>
        <div className="contact-card__links">{phones.map((phone) => <PhoneAction key={phone} phone={phone} />)}<WhatsAppAction /></div>
      </section>
      <section className="contact-card" aria-labelledby="visit-heading">
        <MapPin size={24} strokeWidth={1.5} aria-hidden="true" />
        <h2 id="visit-heading">Visit us</h2>
        <p>{site.SHOWROOM_ADDRESS || site.location}</p>
        {site.SHOWROOM_HOURS && <p>{site.SHOWROOM_HOURS}</p>}
        <div className="contact-card__links">
          {mapDestination
            ? <ActionLink href={mapDestination} tone="text">Get Directions</ActionLink>
            : <PhoneAction phone={site.PHONE_PRIMARY}>Call for Directions</PhoneAction>}
        </div>
      </section>
      <section className="contact-card" aria-labelledby="instagram-heading">
        <Instagram size={24} strokeWidth={1.5} aria-hidden="true" />
        <h2 id="instagram-heading">Follow on Instagram</h2>
        <p>Find collection highlights and showroom updates.</p>
        <div className="contact-card__links"><InstagramAction /></div>
      </section>
    </div>
  );
}
