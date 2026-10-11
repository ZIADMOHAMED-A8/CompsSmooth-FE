export interface RunCompsResponse {
  property: Property;
  comps: CompsResult;
}

export interface RunCompsRequest {
  address: string;
  repairs?: number;
  buying_costs?: number;
  holding_costs?: number;
  selling_costs?: number;
  desired_profit?: number;
}

export type DecimalValue = number | string;

export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  propertyId: string;
  provider: string;
  zip: string;
  latitude: DecimalValue;
  longitude: DecimalValue;
  beds: number;
  baths: DecimalValue;
  sqft: number;
  year_bulit?: number;
  year_built?: number;
  property_type: string;
  mao: DecimalValue;
  createdAt: string;
}

export interface CompsResult {
  address: string;

  subject: {
    property_id: string;
    beds: number;
    baths: number;
    sqft: number;
    year_built: number | null;
    lot_sqft?: number | null;
    latitude: number;
    longitude: number;
  };

  method: string;

  arv: {
    low: number;
    median: number;
    high: number;
  };

  confidence: {
    score: number;
    label: string;
  };

  deal: {
    repairs: number;
    profit: number;
    arv_70: number;
    mao: number;
  };

  deal_inputs_provided: string[];
  comps_used: number;
  tier: string;
  flags: string[];

  search?: {
    radius_miles: number;
    days: number;
  };

  comps: ComparableProperty[];
}

export interface ComparableProperty {
  property_url: string;
  property_id: string;
  listing_id: string | null;

  status: string;
  mls_status?: string | null;

  formatted_address: string;
  full_street_line?: string;
  street?: string;
  unit: string | null;

  city?: string;
  state?: string;
  zip_code?: string;

  beds: number;
  full_baths?: number;
  half_baths: number | null;
  baths: number;

  sqft: number;
  year_built: number;
  lot_sqft?: number | null;

  list_price?: number | null;
  sold_price: number | null;
  sale_price?: number | null;
  sale_date: string | null;
  last_sold_date?: string | null;

  estimated_value: number | null;

  price_per_sqft: number | null;
  ppsf: number | null;

  latitude?: number;
  longitude?: number;
  distance_miles: number;

  score: number;
  adjusted_price?: number;
  implied_arv: number;
  analysis_weight?: number;

  primary_photo: string | null;
  alt_photos?: string | null;
}
