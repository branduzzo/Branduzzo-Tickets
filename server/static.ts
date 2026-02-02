import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static assets (JS, CSS, ecc.)
  app.use(express.static(distPath));

  // --- Gestione main.txt con lingue: IT, EN, ES ---
  app.get("/main.txt", (req, res) => {
    const langHeader = (req.headers["accept-language"] || "").toLowerCase();

    // funzione helper per decidere il file da usare
    const getFileForLang = () => {
      // Se contiene italiano come prima scelta
      if (langHeader.startsWith("it") || langHeader.includes("it-")) {
        return "main-it.txt";
      }

      // Se contiene spagnolo
      if (langHeader.startsWith("es") || langHeader.includes("es-")) {
        return "main-es.txt";
      }

      // Se contiene inglese
      if (langHeader.startsWith("en") || langHeader.includes("en-")) {
        return "main-en.txt";
      }

      // Fallback: inglese di default
      return "main-en.txt";
    };

    const chosenFile = getFileForLang();
    const chosenPath = path.resolve(distPath, chosenFile);

    if (fs.existsSync(chosenPath)) {
      return res.sendFile(chosenPath);
    }

    // Se il file per quella lingua non esiste, fallback a main-en.txt
    const fallbackPath = path.resolve(distPath, "main-en.txt");
    if (fs.existsSync(fallbackPath)) {
      return res.sendFile(fallbackPath);
    }

    // Se non c'è nemmeno il fallback, errore 404
    return res.status(404).send("main.txt not found");
  });

  // --- SPA fallback per il resto ---
  app.use("/{*path}", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
