import { GOLD } from "../data/properties"

const LAST_UPDATED = "1 July 2025"

const SECTIONS = [
  {
    title: "1. Who We Are",
    body: `The White Collection is a privately owned villa rental service operating two properties in Kenya — White Hill Villa (Kisumu) and White Cliff Villa (Mombasa). We operate this website to facilitate direct bookings between guests and ourselves. References to "we", "us", or "our" mean The White Collection.`,
  },
  {
    title: "2. Information We Collect",
    body: `When you use this website or make a booking, we may collect:

• Full name and contact details (email address, phone number)
• Booking information (dates, number of guests, special requests)
• Payment reference information (we do not store card numbers — payments are processed separately)
• Account credentials if you register (email and encrypted password via Supabase Auth)
• Usage data such as pages visited and browser type (via standard server logs)`,
  },
  {
    title: "3. How We Use Your Information",
    body: `We use your information solely to:

• Process and manage your booking
• Communicate with you about your stay (confirmation, check-in details, updates)
• Respond to enquiries you send via our contact form or WhatsApp
• Maintain your guest account and booking history
• Comply with legal obligations

We do not sell, rent, or share your personal data with third parties for marketing purposes.`,
  },
  {
    title: "4. Data Storage & Security",
    body: `Your data is stored securely using Supabase (hosted on AWS infrastructure). We apply row-level security policies so that each guest can only access their own booking records. Passwords are hashed and never stored in plain text. We take reasonable technical measures to protect your data, but no system is 100% secure — please use a strong, unique password for your account.`,
  },
  {
    title: "5. Cookies",
    body: `This website uses minimal cookies — primarily a session cookie to keep you logged in. We do not use advertising or tracking cookies. You can disable cookies in your browser settings, but this may affect login functionality.`,
  },
  {
    title: "6. Third-Party Services",
    body: `We use the following third-party services that may process your data:

• Supabase — authentication and database (supabase.com/privacy)
• Vercel — website hosting (vercel.com/legal/privacy-policy)
• WhatsApp — direct communication (whatsapp.com/legal/privacy-policy)

Each service has its own privacy policy governing how they handle data.`,
  },
  {
    title: "7. Your Rights",
    body: `You have the right to:

• Access the personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your account and associated data
• Withdraw consent for communications at any time

To exercise any of these rights, contact us at hello@thewhitecollection.co.ke.`,
  },
  {
    title: "8. Data Retention",
    body: `We retain booking records for up to 3 years for accounting and legal compliance purposes. Account data is retained until you request deletion. You may request deletion of your account at any time by contacting us directly.`,
  },
  {
    title: "9. Children",
    body: `This website is not directed at children under 18. We do not knowingly collect personal data from minors. If you believe a minor has submitted data to us, please contact us and we will delete it promptly.`,
  },
  {
    title: "10. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page will reflect any changes. Continued use of the website after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "11. Contact",
    body: `For any privacy-related questions or requests, contact us at:\n\nEmail: hello@thewhitecollection.co.ke\nWhatsApp: +254 7XX XXX XXX\nLocation: Kisumu & Mombasa, Kenya`,
  },
]

export default function Privacy() {
  return (
    <div className="pt-24 pb-24 min-h-screen page-in">
      <div className="max-w-3xl mx-auto px-6 pt-10">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
          Legal
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-3 leading-tight">
          Privacy Policy
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
