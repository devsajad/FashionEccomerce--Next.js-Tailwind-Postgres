import { type DefaultSession } from "next-auth";
import { Role } from "@prisma/client"; // Import your Role enum

// Extend the built-in session and user types
declare module "next-auth" {
  /**
   * The shape of the user object returned in the session.
   * By default, it only has name, email, and image.
   * We are adding id and role to it.
   */
  interface Session {
    user: {
      id: string;
      role: Role; // Use the Role enum
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object returned from the database.
   * We are adding the role to the default user type.
   */
  interface User {
    role: Role; 
  }
}

// Extend the built-in JWT type
declare module "next-auth/jwt" {
  /**
   * The shape of the JWT token.
   * By default, it only has name, email, picture, and sub.
   * We are adding id and role to it.
   */
  interface JWT {
    id: string;
    role: Role; // Use the Role enum
  }
}
