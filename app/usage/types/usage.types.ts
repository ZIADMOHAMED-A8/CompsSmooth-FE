export interface UsageResponse {
  success: boolean;

  data: {
    plan: {
      id: string;
      name: string;
      startDate: string;
      expirationDate: string | null;
    };

    usage: {
      used: number;
      limit: number;
      remaining: number;
      periodStart: string;
    };

    propertiesRan: {
      thisMonth: number;
      lastMonth: number;
    };
  };
}