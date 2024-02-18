import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insert = mutation({
  args: { dietary_restrictions: v.any() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    return await ctx.db.insert("tourists", {
      name: identity.name,
      tokenIdentifier: identity.tokenIdentifier,
      dietary_restrictions: args.dietary_restrictions,
    });
  },
});
