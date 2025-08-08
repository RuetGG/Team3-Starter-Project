import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/authOptions"; // adjust path based on where you saved it

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
