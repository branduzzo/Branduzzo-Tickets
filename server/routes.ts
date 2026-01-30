import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.generate.path, async (req, res) => {
    try {
      const { botName, token } = api.generate.input.parse(req.body);

      // Read the template file
      const templatePath = path.join(process.cwd(), "attached_assets", "main_1769782315149.txt");
      let content = await fs.readFile(templatePath, "utf-8");

      // Sanitize bot name for class usage (PascalCase, no spaces/special chars)
      // Example: "My Bot!" -> "MyBot"
      const className = botName
        .replace(/[^a-zA-Z0-9]/g, " ") // replace special chars with space
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize words
        .join("") || "MyBot"; // Default if empty

      // Perform Replacements
      
      // 1. Replace Class Definition
      // class GalacticalMC(commands.Bot): -> class [ClassName](commands.Bot):
      content = content.replace(/class GalacticalMC\(commands\.Bot\):/g, `class ${className}(commands.Bot):`);

      // 2. Replace Instantiation placeholder
      // bot = [ServerName]() -> bot = [ClassName]()
      content = content.replace(/bot = \[ServerName\]\(\)/g, `bot = ${className}()`);

      // 3. Replace Transcript Header
      // TRANSCRIPT TICKET - GalacticalMC -> TRANSCRIPT TICKET - [BotName]
      content = content.replace(/TRANSCRIPT TICKET - GalacticalMC/g, `TRANSCRIPT TICKET - ${botName}`);

      // 4. Replace Footer Text
      // text="GalacticalMC Ticket System" -> text="[BotName] Ticket System"
      content = content.replace(/text="GalacticalMC Ticket System"/g, `text="${botName} Ticket System"`);

      // 5. Replace Status Name placeholder
      // name="[ServerName]" -> name="[BotName]"
      content = content.replace(/name="\[ServerName\]"/g, `name="${botName}"`);

      // 6. Replace Token placeholder
      // bot.run("[TOKEN]") -> bot.run("[ActualToken]")
      content = content.replace(/bot\.run\("\[TOKEN\]"\)/g, `bot.run("${token}")`);

      // Set headers for file download
      res.setHeader('Content-Type', 'text/x-python');
      res.setHeader('Content-Disposition', 'attachment; filename="main.py"');
      
      res.send(content);

    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input" });
      } else {
        console.error("Generation error:", err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}
