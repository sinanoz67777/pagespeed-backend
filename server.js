const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/speedtest", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL parametresi gerekli" });

  try {
    const response = await axios.get(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        url
      )}&key=${process.env.PSI_API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "API hatası", detay: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Sunucu ${PORT} portunda çalışıyor.`)
);
