let translations = {}; // Oggetto per memorizzare le traduzioni

// Carica le traduzioni dal file JSON
fetch("translations.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Errore nel caricamento del file JSON");
    }
    return response.json();
  })
  .then((data) => {
    translations = data; // Salva le traduzioni
    const savedLang = localStorage.getItem("language") || "en"; // Recupera la lingua salvata o usa "en" di default
    updateContent(savedLang); // Applica la lingua
  })
  .catch((error) => console.error("Errore:", error));

// Aggiungi evento click alle bandiere
document.getElementById("flags").addEventListener("click", (event) => {
  event.preventDefault(); // Evita il refresh della pagina
  if (event.target.classList.contains("flag")) {
    const selectedLang = event.target.dataset.lang; // Legge la lingua selezionata
    localStorage.setItem("language", selectedLang); // Salva la lingua selezionata in localStorage
    updateContent(selectedLang); // Aggiorna i testi
  }
});

// Funzione per aggiornare i contenuti
function updateContent(lang) {
  if (!translations[lang]) return; // Verifica che la lingua esista
  const elements = document.querySelectorAll("[id]");
  elements.forEach((el) => {
    const key = el.id; // Usa l'attributo ID come chiave
    if (translations[lang][key]) {
      el.textContent = translations[lang][key]; // Aggiorna il testo
    }
  });
}
