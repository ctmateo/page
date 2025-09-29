async function translateText(text, lang) {
  const res = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "DeepL-Auth-Key TU_API_KEY_AQUI", // 👈 pon tu key aquí
    },
    body: new URLSearchParams({
      text: text,
      target_lang: lang.toUpperCase(), // ES, EN, FR, DE, etc.
    }),
  });

  const data = await res.json();
  console.log("DeepL response:", data);
  return data.translations[0].text;
}
async function traductionDom(language) {
  const initial_doc = {};
  console.log("in traduccion");

  // Guardamos los textos originales
  document.querySelectorAll("[translate-text]").forEach((element) => {
    const id = element.getAttribute("text-id");
    initial_doc[id] = element.innerText;
  });

  async function translateAllPage(language) {
    const elements = document.querySelectorAll("[translate-text]");
    for (let element of elements) {
      const key = element.getAttribute("text-id");
      const initial_text = initial_doc[key];
      const dynamic_translate = await translateText(initial_text, language);
      element.innerText = dynamic_translate ?? initial_text;
    }
  }

  translateAllPage(language);
}
Access to fetch at 'https7://api-free.deepl.com/v2/translate' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.



---------++++
  
import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Necesario para servir archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // sirve index.html

// Ruta para traducir
app.post("/translate", async (req, res) => {
  const { text, lang } = req.body;

  try {
    const deeplRes = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "DeepL-Auth-Key TU_API_KEY_AQUI", // pon tu clave aquí
      },
      body: new URLSearchParams({
        text: text,
        target_lang: lang,
      }),
    });

    const data = await deeplRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error en la traducción", details: err });
  }
});

app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
  

