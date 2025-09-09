const siteConfig = {
  // Branding
  initials: "AM",
  name: "Alice Martin",
  role: "Customer Service Director — VAT Taxation",

  // Contact
  location: "Paris, France",
  email: "alice.martin@example.com",
  phone: "+33 6 12 34 56 78",
  linkedin: "https://www.linkedin.com/in/alice-martin-vat",
  website: "https://example.com",

  // Summary (shown in the hero)
  summary: [
    "15+ years leading multilingual customer service teams in VAT compliance across EU markets.",
    "Raised SLA adherence from 88% to 98% by reengineering escalation workflows and KPI dashboards.",
    "Partnered with Tax, Legal, and Product to reduce audit risk and streamline VAT return processes."
  ],

  // Highlight KPIs (optional chips)
  kpis: [
    { label: "SLA Adherence", value: "98%" },
    { label: "NPS", value: "+46" },
    { label: "First Contact Resolution", value: "82%" }
  ],

  // Competencies
  skills: [
    "VAT compliance & audits",
    "Customer operations strategy",
    "SLA policy & governance",
    "Process redesign & automation",
    "Stakeholder management",
    "Change management",
    "Coaching & performance"
  ],
  tools: [
    "SAP / Oracle",
    "Zendesk / Salesforce Service Cloud",
    "Power BI / Tableau",
    "Jira / Confluence",
    "Microsoft 365"
  ],
  languages: ["French (native)", "English (C1)", "Spanish (B2)"],

  // Experience (brief demo data)
  experience: [
    {
      title: "Customer Service Director, VAT",
      company: "EuroTax Solutions",
      period: "2019 — Present",
      points: [
        "Led a 45-person VAT customer service organization across 4 EU hubs; improved SLA adherence to 98%.",
        "Implemented tiered escalation and root-cause reviews, reducing repeat contacts by 24%.",
        "Introduced KPI dashboards (FRT, AHT, FCR) improving executive reporting and decision-making.",
        "Partnered with Tax and Legal to standardize responses for complex VAT rulings and audits."
      ]
    },
    {
      title: "Customer Support Manager, VAT",
      company: "FinTax Group",
      period: "2014 — 2019",
      points: [
        "Managed L1–L3 support for VAT returns with 20,000+ monthly tickets; achieved FCR 82%.",
        "Drove process automation with Product, reducing average handle time by 18%.",
        "Launched multilingual knowledge base, decreasing time-to-resolution and improving CSAT."
      ]
    }
  ],

  education: [
    { title: "MSc, International Business & Tax", org: "HEC Paris", period: "2011" }
  ],

  certifications: [
    "ITIL Foundation",
    "Lean Six Sigma Green Belt",
    "VAT Compliance Diploma (CIOT)"
  ]
};

export default siteConfig;
