import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  cars: defineTable({
    name: v.string(),
    pricePerDay: v.number(),
    status: v.union(v.literal("available"), v.literal("rented")),
    imageId: v.optional(v.id("_storage")),
    category: v.optional(v.string()),
    order: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_order", ["order"]),

  bookings: defineTable({
    carId: v.id("cars"),
    carName: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    location: v.string(),
    totalPrice: v.number(),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("cancelled")),
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),
});

