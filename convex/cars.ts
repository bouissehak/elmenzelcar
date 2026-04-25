import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getCars = query({
  args: { status: v.optional(v.union(v.literal("available"), v.literal("rented"))) },
  handler: async (ctx, args) => {
    const status = args.status;
    let cars;
    if (status) {
      cars = await ctx.db
        .query("cars")
        .withIndex("by_status", (q) => q.eq("status", status))
        .collect();
    } else {
      cars = await ctx.db.query("cars").collect();
    }

    // Sort by order ascending, then by createdAt descending as fallback
    cars.sort((a, b) => {
      const orderDiff = (a.order ?? 0) - (b.order ?? 0);
      if (orderDiff !== 0) return orderDiff;
      return (b.createdAt ?? 0) - (a.createdAt ?? 0);
    });

    return await Promise.all(
      cars.map(async (car) => ({
        ...car,
        displayImageUrl: car.imageId
          ? await ctx.storage.getUrl(car.imageId)
          : (car as any).imageUrl || null,
      }))
    );
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const addCar = mutation({
  args: {
    name: v.string(),
    pricePerDay: v.number(),
    status: v.union(v.literal("available"), v.literal("rented")),
    imageId: v.optional(v.id("_storage")),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get max order to place new car at the end
    const allCars = await ctx.db.query("cars").collect();
    const maxOrder = allCars.reduce((max, car) => Math.max(max, car.order ?? 0), 0);

    return await ctx.db.insert("cars", {
      ...args,
      order: maxOrder + 1,
      createdAt: Date.now(),
    });
  },
});

export const updateCar = mutation({
  args: {
    id: v.id("cars"),
    name: v.optional(v.string()),
    pricePerDay: v.optional(v.number()),
    status: v.optional(v.union(v.literal("available"), v.literal("rented"))),
    imageId: v.optional(v.id("_storage")),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const deleteCar = mutation({
  args: { id: v.id("cars") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const swapOrder = mutation({
  args: {
    carAId: v.id("cars"),
    carBId: v.id("cars"),
  },
  handler: async (ctx, args) => {
    const carA = await ctx.db.get(args.carAId);
    const carB = await ctx.db.get(args.carBId);

    if (!carA || !carB) {
      throw new Error("One or both cars not found");
    }

    const orderA = carA.order ?? 0;
    const orderB = carB.order ?? 0;

    await ctx.db.patch(args.carAId, { order: orderB });
    await ctx.db.patch(args.carBId, { order: orderA });
  },
});

// One-time migration: assign order values to existing cars that don't have them
export const migrateOrder = mutation({
  args: {},
  handler: async (ctx) => {
    const allCars = await ctx.db.query("cars").collect();
    let assigned = 0;

    for (let i = 0; i < allCars.length; i++) {
      const car = allCars[i];
      // Only patch cars that are missing the order field
      if (car.order === undefined || car.order === null) {
        await ctx.db.patch(car._id, { order: i });
        assigned++;
      }
    }

    return { assigned, total: allCars.length };
  },
});

