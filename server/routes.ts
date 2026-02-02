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

      // Select template based on language from request body
      const templateFiles: Record<string, string> = {
        en: "main_en.txt",
        it: "main_it.txt",
        es: "main_es.txt"
      };
      const templateFile = templateFiles[language] || "main_en.txt";
      const templatePath = path.join(process.cwd(), "attached_assets", templateFile);
      
      let content: string;
      try {
        content = await fs.readFile(templatePath, "utf-8");
      } catch (fileErr) {
        console.error(`Template file not found: ${templatePath}`);
        res.status(500).json({ message: "Template file not found" });
        return;
      }

      // Sanitize bot name for class usage (PascalCase)
      const className = botName
        .replace(/[^a-zA-Z0-9]/g, " ")
        .split(" ")
        .filter(word => word.length > 0)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join("") || "MyBot";

      // Replace class definition placeholder [ServerName]
      content = content.replace(/class \[ServerName\]\(commands\.Bot\):/g, `class ${className}(commands.Bot):`);
      
      // Replace instantiation placeholder
      content = content.replace(/bot = \[ServerName\]\(\)/g, `bot = ${className}()`);

      // Replace status name placeholder
      content = content.replace(/name="\[ServerName\]"/g, `name="${botName}"`);

      // Replace token placeholder
      content = content.replace(/bot\.run\("\[TOKEN\]"\)/g, `bot.run("${token}")`);

      // Set headers for file download
      res.setHeader("Content-Type", "text/x-python");
      res.setHeader("Content-Disposition", 'attachment; filename="main.py"');
      
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
