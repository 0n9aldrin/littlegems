import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const insert = mutation({
  args: { lon: v.any(), lat: v.any(), dist: v.any() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    return await ctx.db.insert("locals", {
      name: identity.name,
      tokenIdentifier: identity.tokenIdentifier,
      lon: args.lon,
      lat: args.lat,
      dist: args.dist,
    });
  },
});

export const getSelf = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const data = await ctx.db
      .query("locals")
      .filter((q) => q.eq(q.field("name"), identity.name))
      .collect();
    return data;
  },
});
