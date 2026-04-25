import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getBookings = query({
  args: { status: v.optional(v.union(v.literal("pending"), v.literal("confirmed"), v.literal("cancelled"))) },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("bookings")
        .withIndex("by_status", (q) => q.eq("status", args.status))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("bookings").order("desc").collect();
  },
});

export const createBooking = mutation({
  args: {
    carId: v.id("cars"),
    carName: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    location: v.string(),
    totalPrice: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bookings", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const updateBookingStatus = mutation({
  args: {
    id: v.id("bookings"),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("cancelled")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const getAnalytics = query({
  args: {},
  handler: async (ctx) => {
    const cars = await ctx.db.query("cars").collect();
    const bookings = await ctx.db.query("bookings").collect();

    const totalCars = cars.length;
    const activeBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "pending").length;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayRevenue = bookings
      .filter((b) => b.status === "confirmed" && b.createdAt >= todayStart.getTime())
      .reduce((sum, b) => sum + b.totalPrice, 0);

    return { totalCars, activeBookings, todayRevenue };
  },
});

