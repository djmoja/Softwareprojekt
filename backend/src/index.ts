import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// API-Routen
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend!" });
});

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
});

// CORS für lokale Entwicklung
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        if (req.method === 'OPTIONS') return res.sendStatus(200);
        next();
    });
}

// Production: Statisches Frontend aus public/ servieren
if (process.env.NODE_ENV === 'production') {
    const publicPath = join(__dirname, "../public");
    console.log(` Serving frontend from: ${publicPath}`);

    app.use(express.static(publicPath));

    // SPA Catch-All
    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(join(publicPath, "index.html"));
    });
}

app.listen(port, () => {
    console.log(` Server running on port ${port}`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
});
