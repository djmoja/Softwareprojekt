import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// API-Routen
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend!" });
});

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
});

// Statisches Frontend hosten
app.use(express.static(join(__dirname, "frontend"))); // frontend liegt in dist/frontend

// SPA Catch-All für alle Nicht-API-Routen
app.all(/^(?!\/api).*/, (req, res) => {
    res.sendFile(join(__dirname, "frontend/index.html"));
});

// Server starten
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
