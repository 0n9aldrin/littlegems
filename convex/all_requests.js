import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { v } from "convex/values";

function haversine(lat1, lon1, lat2, lon2) {
  // Radius of the Earth in miles
  const R = 3958.8;

  // Convert latitude and longitude from degrees to radians
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lon1Rad = (lon1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const lon2Rad = (lon2 * Math.PI) / 180;

  // Haversine formula
  const dlon = lon2Rad - lon1Rad;
  const dlat = lat2Rad - lat1Rad;
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

export const createRequest = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("tasks", { text: args.text });
    // do something with `taskId`
  },
});

export const get = query({
  args: { lat: v.float64(), lon: v.float64(), limit: v.float64() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("requests")
      .filter((q) =>
        q.lte(
          haversine(q.field("lat"), q.field("lon"), args.lat, args.lon),
          args.limit
        )
      )
      .collect();
  },
});
