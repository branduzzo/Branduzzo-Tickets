import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We don't really need a DB for this app as it's a file generator,
// but we'll keep the structure valid.
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
});

// Schema for the generation request
export const generateBotSchema = z.object({
  botName: z.string().min(1, "Bot name is required").max(50),
  token: z.string().min(1, "Bot token is required"),
});

export type GenerateBotRequest = z.infer<typeof generateBotSchema>;
