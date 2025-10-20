import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Bissl Beispiel API
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend!" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
