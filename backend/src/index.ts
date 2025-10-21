import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(join(__dirname, "../../frontend/dist")));

// Beispiel-API
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend!" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
