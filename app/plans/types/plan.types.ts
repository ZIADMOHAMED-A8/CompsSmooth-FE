export interface Plan {
  id: string;
  plan: string;
  price: string;
  monthly_request_limit: number;
}

export interface CreateCheckoutSessionPayload {
  planId: string;
}

export interface CreateCheckoutSessionResponse {
  data:{
    url: string;
  }
}