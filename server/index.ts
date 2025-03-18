// import express, { type Request, Response, NextFunction } from "express";
// import { registerRoutes } from "./routes";
// import { setupVite, serveStatic, log } from "./vite";

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   const start = Date.now();
//   const path = req.path;
//   let capturedJsonResponse: Record<string, any> | undefined = undefined;

//   const originalResJson = res.json;
//   res.json = function (bodyJson, ...args) {
//     capturedJsonResponse = bodyJson;
//     return originalResJson.apply(res, [bodyJson, ...args]);
//   };

//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     if (path.startsWith("/api")) {
//       let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
//       if (capturedJsonResponse) {
//         logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
//       }

//       if (logLine.length > 80) {
//         logLine = logLine.slice(0, 79) + "…";
//       }

//       log(logLine);
//     }
//   });

//   next();
// });

// 
// server/index.ts
import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from 'path';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route logging
app.use((req, res, next) => {
  log(`[${req.method}] ${req.originalUrl}`);
  next();
});

(async () => {
  try {
    const server = await registerRoutes(app);
    const PORT = parseInt(process.env.PORT || "3000", 10);
    const HOST = "0.0.0.0";

    // Static files
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      const clientDistPath = path.resolve(process.cwd(), 'dist/client');
      const assetsPath = path.resolve(clientDistPath, 'assets');
      
      app.use('/assets', express.static(assetsPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(clientDistPath, 'index.html'));
      });
    }

    server.listen(PORT, HOST, () => {
      log(`✅ Server running at http://localhost:${PORT}`);
    });

  } catch (error) {
    log(`Startup failed: ${error}`);
    process.exit(1);
  }
})();