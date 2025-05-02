import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

if (!NEWS_API_KEY) {
  console.error("❌ NEWS_API_KEY is not set!");
  process.exit(1);
}

app.get("/news", async (req, res) => {
  try {
    const country = req.query.country || "us";
    const category = req.query.category || "technology";
    const response = await axios.get(NEWS_API_URL, {
      params: {
        country,
        category,
        apiKey: NEWS_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error: any) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
