export interface RunCompsResponse {
  property: Property;
  comps: CompsResult;
}

export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  propertyId: string;
  provider: string;
  zip: string;
  latitude: string;
  longitude: string;
  beds: number;
  baths: string;
  sqft: number;
  year_bulit: number;
  property_type: string;
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
    latitude: number;
    longitude: number;
  };

  arv: {
    low: number;
    median: number;
    high: number;
  };

  confidence: {
    score: number;
    label: string;
  };

  mao: number;
  comps_used: number;

  search: {
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

  formatted_address: string;
  full_street_line: string;
  street: string;
  unit: string | null;

  city: string;
  state: string;
  zip_code: string;

  beds: number;
  full_baths: number;
  half_baths: number | null;
  baths: number;

  sqft: number;
  year_built: number;

  sold_price: number | null;
  sale_date: string | null;

  estimated_value: number | null;

  price_per_sqft: number | null;
  ppsf: number | null;

  distance_miles: number;

  score: number;
  implied_arv: number;
  analysis_weight: number;

  primary_photo: string | null;
}