import express from "express";
import path from "path";
import { promises as fs } from "fs";
import { api } from "@shared/routes";
import { z } from "zod";

export const registerRoutes = (app: express.Express) => {
  app.get(api.health.path, (req, res) => {
    res.json({ status: "ok" });
  });

  app.post(api.generate.path, async (req, res) => {
    try {
      const { botName, token, language } = api.generate.input.parse(req.body);

      let templateFile = "main_en.txt";
      if (language === "it") templateFile = "main_it.txt";
      if (language === "es") templateFile = "main_es.txt";

      const templatePath = path.join(
        process.cwd(),
        "attached_assets",
        templateFile
      );

      let content = await fs.readFile(templatePath, "utf-8");

      const className =
        botName
          .replace(/[^a-zA-Z0-9]/g, " ")
          .split(" ")
          .filter((w) => w.length > 0)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("") || "MyBot";

      content = content.replace(
        /class \[ServerName\]\(commands\.Bot\):/g,
        `class ${className}(commands.Bot):`
      );
      content = content.replace(
        /bot = \[ServerName\]\(\)/g,
        `bot = ${className}()`
      );
      content = content.replace(
        /TRANSCRIPT TICKET - \[ServerName\]/g,
        `TRANSCRIPT TICKET - ${botName}`
      );
      content = content.replace(
        /text="\[ServerName\] Ticket System"/g,
        `text="${botName} Ticket System"`
      );
      content = content.replace(
        /name="\[ServerName\]"/g,
        `name="${botName}"`
      );
      content = content.replace(
        /bot\.change_presence\([\s\S]*?name="\[ServerName\]"/g,
        (match) => match.replace("[ServerName]", botName)
      );
      content = content.replace(
        /bot\.run\("\[TOKEN\]"\)/g,
        `bot.run("${token}")`
      );

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
};
