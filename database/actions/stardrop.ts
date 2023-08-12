import { db } from "@/database/db";
import {
  NewStardrop,
  NewStardropValidator,
  StardropTable,
} from "@/database/models/stardrop";

/**
 * Create new Stardrop
 */
export async function createStardrop(data: NewStardrop): Promise<NewStardrop> {
  const stardrop = NewStardropValidator.parse(data);
  const rows = await db.insert(StardropTable).values(stardrop).returning();
  return rows[0];
}
