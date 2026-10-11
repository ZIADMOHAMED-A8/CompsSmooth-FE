export type UserRole = "USER" | "ADMIN" | string;

export interface ProfileUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  message?: string;
  data: {
    user: ProfileUser;
  };
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
}
