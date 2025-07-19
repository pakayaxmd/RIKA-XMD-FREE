const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const RENDER_API_KEY = process.env.RENDER_API_KEY;
const GITHUB_REPO = "pakebija/RIKA-XMD-v2";

app.post("/api/deploy", async (req, res) => {
  const { session_id } = req.body;

  try {
    const response = await axios.post(
      "https://api.render.com/v1/services",
      {
        name: `rika-xmd-${Date.now()}`,
        type: "web",
        repo: {
          type: "github",
          owner: "cyberrikado",
          name: "RIKA-XMD-V2",
          branch: "main",
        },
        env: [
          { key: "SESSION_ID", value: session_id }
        ],
        buildCommand: "npm install",
        startCommand: "node .",
        region: "oregon",
        plan: "free"
      },
      {
        headers: {
          Authorization: `Bearer ${RENDER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ message: "✅ Bot is deploying on Render!" });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to deploy bot", details: err.message });
  }
});

app.listen(3000, () => console.log("🌐 Server running on http://localhost:3000"));
