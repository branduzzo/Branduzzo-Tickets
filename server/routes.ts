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
      const { botName, token, language } = api.generate.input.parse(req.body);

      // Select template based on language
      const templateFiles: Record<string, string> = {
        en: "main_en.txt",
        it: "main_it.txt",
        es: "main_es.txt"
      };
      const templateFile = templateFiles[language] || "main_en.txt";
      const templatePath = path.join(process.cwd(), "attached_assets", templateFile);
      let content = await fs.readFile(templatePath, "utf-8");

      // Sanitize bot name for class usage (PascalCase, no spaces/special chars)
      const className = botName
        .replace(/[^a-zA-Z0-9]/g, " ")
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join("") || "MyBot";

      // Replace class definition placeholder
      content = content.replace(/class \[ServerName\]\(commands\.Bot\):/g, `class ${className}(commands.Bot):`);
      content = content.replace(/class GalacticalMC\(commands\.Bot\):/g, `class ${className}(commands.Bot):`);

      // Replace instantiation placeholder
      content = content.replace(/bot = \[ServerName\]\(\)/g, `bot = ${className}()`);

      // Replace transcript header
      content = content.replace(/TRANSCRIPT TICKET - GalacticalMC/g, `TRANSCRIPT TICKET - ${botName}`);
      content = content.replace(/TRANSCRIPT TICKET - \[ServerName\]/g, `TRANSCRIPT TICKET - ${botName}`);

      // Replace footer text
      content = content.replace(/text="GalacticalMC Ticket System"/g, `text="${botName} Ticket System"`);
      content = content.replace(/text="\[ServerName\] Ticket System"/g, `text="${botName} Ticket System"`);

      // Replace status name placeholder
      content = content.replace(/name="\[ServerName\]"/g, `name="${botName}"`);

      // Replace token placeholder
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
