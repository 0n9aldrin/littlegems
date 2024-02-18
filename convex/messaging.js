import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query("messages").order("desc").collect();
    return messages.reverse();
  },
});

export const send = mutation({
  args: { message: v.string(), origin: v.string() },
  handler: async (ctx, { message, origin }) => {
    // Send a new message.
    await ctx.db.insert("messages", { message, origin });
  },
});
