import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Server-side admin secret — never exposed to the client
const ADMIN_PASSWORD = "admin";

export const adminLogin = mutation({
  args: { password: v.string() },
  handler: async (_ctx, args) => {
    if (args.password === ADMIN_PASSWORD) {
      return { success: true, token: "admin-auth-token-v1" };
    }
    return { success: false, token: null };
  },
});


