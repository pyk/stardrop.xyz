import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const StardropTable = pgTable("stardrops", {
  id: serial("id").primaryKey(),
  name: text("name"),
  symbol: text("symbol"),
  description: text("description"),
  mediaCid: text("media_cid"),
  activityType: text("activity_type"),
  activityNetwork: text("activity_network"),
  activityData: jsonb("activity_data"),
});

export type Stardrop = InferModel<typeof StardropTable>;
export type NewStardrop = InferModel<typeof StardropTable, "insert">;

export const NewStardropValidator = createInsertSchema(StardropTable, {
  name: (schema) => schema.name.min(1).trim(),
  symbol: (schema) => schema.symbol.min(1).trim().toUpperCase(),
  description: (schema) => schema.description.trim().optional(),
  activityType: (schema) =>
    schema.activityType.refine((type) => ["send-eth"].includes(type), {
      message: "Unknown activity type",
    }),
  activityNetwork: (schema) =>
    schema.activityNetwork.refine(
      (network) => ["ethereum"].includes(network),
      { message: "Unknown activity network" }
    ),
});
