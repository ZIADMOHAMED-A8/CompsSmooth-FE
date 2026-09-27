import { DefaultSession } from "next-auth";
import { DefaultJWT } from "@auth/core/jwt";

declare module "next-auth" {
  interface User {
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    accessToken: string;
    refreshToken: string;

    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
    refreshToken: string;
  }
}