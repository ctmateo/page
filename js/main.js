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
