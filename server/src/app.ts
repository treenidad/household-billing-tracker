import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 🔥 FIX: Allow your Vite frontend URL explicitly
app.use(
  cors({
    origin: "https://solid-guacamole-5vwpjwjj7x5hvxpp-5173.app.github.dev",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
