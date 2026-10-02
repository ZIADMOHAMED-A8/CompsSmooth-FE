export interface RecentCompsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface RecentCompsResponse {
  success: boolean;
  data: {
    properties: RecentComp[];
    pagination: RecentCompsPagination;
  };
}

export interface RecentComp {
  [key: string]: unknown;
}

export interface GetRecentCompsParams {
  page?: number;
  limit?: number;
}