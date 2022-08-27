import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  res.json({ ok: "requete ok" });
});

app.set("port", PORT);

app.listen(PORT);
