import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email: string;
    isAdmin: boolean;
  }

  interface Session {
    user: User;
  }
}
