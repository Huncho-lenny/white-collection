import { GOLD } from "../data/properties"

const LAST_UPDATED = "1 July 2025"

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing this website or making a booking with The White Collection, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website or our services.`,
  },
  {
    title: "2. Our Services",
    body: `The White Collection provides direct villa rental services for two privately owned properties in Kenya:

• White Hill Villa — Kisumu, Kenya
• White Cliff Villa — Mombasa, Kenya

All bookings are made directly with us. We are not a booking platform or agency — you are contracting directly with the property owners.`,
  },
  {
    title: "3. Bookings & Reservations",
    body: `A booking is confirmed only when:

• You have submitted a booking request through this website or via WhatsApp
• We have confirmed availability in writing (WhatsApp or email)
• A deposit has been received and acknowledged by us

We reserve the right to decline any booking at our discretion. Submitting a booking request does not guarantee availability.`,
  },
  {
    title: "4. Pricing",
    body: `All prices are displayed in Kenyan Shillings (KSh) and represent the nightly rate per villa. Prices are subject to change without notice until a booking is confirmed. There are no platform fees or booking surcharges — you pay only the nightly rate.`,
  },
  {
    title: "5. Payment",
    body: `Payment terms will be communicated at the time of booking confirmation. We currently accept M-Pesa and bank transfer. A deposit is required to secure your dates. The balance is due as agreed at the time of confirmation. Failure to pay the balance by the agreed date may result in cancellation of your booking.`,
  },
  {
    title: "6. Cancellation Policy",
    body: `Our cancellation policy is as follows:

• 14+ days before check-in: Full refund of deposit paid
• 7–13 days before check-in: 50% refund of deposit paid
• Under 7 days before check-in: No refund

All cancellation notice periods are calculated from midnight EAT (UTC+3) on the check-in date. To cancel, contact us via WhatsApp or email with your booking reference. We strongly recommend travel insurance for all bookings.`,
  },
  {
    title: "7. Guest Responsibilities",
    body: `As a guest, you agree to:

• Treat the property and its contents with care and respect
• Not exceed the maximum guest capacity stated for each villa
• Not hold events, parties, or gatherings without prior written consent
• Report any damage or maintenance issues to us promptly
• Vacate the property by the agreed check-out time
• Comply with any house rules communicated at check-in

You are liable for any damage caused to the property during your stay beyond normal wear and tear.`,
  },
  {
    title: "8. Our Responsibilities",
    body: `We will:

• Provide the villa in a clean, well-maintained condition
• Ensure all listed amenities are available and functional
• Be reachable via WhatsApp throughout your stay for any issues
• Address maintenance problems promptly

We are not liable for circumstances beyond our reasonable control, including but not limited to power outages, weather events, or utility disruptions.`,
  },
  {
    title: "9. Limitation of Liability",
    body: `To the fullest extent permitted by law, The White Collection shall not be liable for any indirect, incidental, or consequential loss arising from your use of our services or your stay at our properties. Our total liability in any circumstance shall not exceed the total amount paid by you for the relevant booking.`,
  },
  {
    title: "10. Intellectual Property",
    body: `All content on this website — including text, images, logos, and design — is owned by or licensed to The White Collection. You may not reproduce, distribute, or use any content without our prior written permission.`,
  },
  {
    title: "11. Governing Law",
    body: `These Terms and Conditions are governed by the laws of Kenya. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the Kenyan courts.`,
  },
  {
    title: "12. Changes to These Terms",
    body: `We may update these Terms and Conditions at any time. The "Last updated" date at the top of this page will reflect changes. Continued use of the website after changes constitutes acceptance of the updated terms.`,
  },
  {
    title: "13. Contact",
    body: `For any questions about these Terms and Conditions:\n\nEmail: hello@thewhitecollection.co.ke\nWhatsApp: +254 7XX XXX XXX\nLocation: Kisumu & Mombasa, Kenya`,
  },
]

export default function Terms() {
  return (
    <div className="pt-24 pb-24 min-h-screen page-in">
      <div className="max-w-3xl mx-auto px-6 pt-10">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
          Legal
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-3 leading-tight">
          Terms &amp; Conditions
        </h1>
        <p className="text-muted-foreground text-sm mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{s.title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
