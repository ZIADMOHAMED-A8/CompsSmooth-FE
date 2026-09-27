export interface PlanPresentation {
  eyebrow: string;
  description: string;
  features: string[];
  badge?: string;
}

export const planPresentation: Record<
  string,
  PlanPresentation
> = {
  FREE: {
    eyebrow: "EXPLORATORY",

    description:
      "Engineered for solo researchers and independent appraisers conducting ad-hoc residential valuations.",

    features: [
      "Basic property lookup",
      "Single workspace seat",
      "Public historical comps only",
    ],
  },

  PRO: {
    eyebrow: "STANDARD PRODUCTION",

    description:
      "Full-spectrum multi-source reconciliation for growing real-estate investment desks and proptech platforms.",

    features: [
      "Zillow / Redfin / Realtor live sync",
      "Structured export: CSV, GeoJSON, Parquet",
      "Sub-second compute clusters",
      "Real-time webhook alert triggers",
      "5 concurrent team seats",
    ],

    
  },

  ENTERPRISE: {
    eyebrow: "INSTITUTIONAL SCALE",

    description:
      "Direct MLS feeds, custom automated valuation algorithms, and institutional SLA for nationwide REITs.",

    features: [
      "Raw RESO Web API & MLS ingest",
      "Custom Valuation Models (AVM)",
      "Isolated dedicated egress rate limits",
      "Dedicated Cadastral Support",
      "Unlimited team seats",
    ],

    badge: "MAX ACCELERATION",
  },
};