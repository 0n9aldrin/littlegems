import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const createRequest = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("tasks", { text: args.text });
    // do something with `taskId`
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("requests")
      .filter((q) => q.gte(q.field("age"), 18))
      .collect();
  },
});
