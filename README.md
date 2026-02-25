<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

🧠 1️⃣ App.tsx (UI + Stato)

È il cuore dell’app.

Contiene:

Stato principale (useState) → meteo, loading, errore

useEffect → chiamata API al caricamento

Gestione ricerca città

Rendering UI dinamico

Esempio logico semplificato:

const [weather, setWeather] = useState<WeatherData | null>(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
  fetchWeather();
}, []);

Qui:

Viene chiamato il servizio meteo

I dati aggiornano lo stato

React ri-renderizza automaticamente l’interfaccia

👉 È il file che collega tutto.

🌦️ 2️⃣ weatherService.ts (Logica + API)

Qui avviene la chiamata a wttr.in.

Contiene:

Funzione per fetch dei dati

Parsing della risposta JSON

Logica per generare avvisi automatici

Esempio concettuale:

export async function getWeather(city: string) {
  const response = await fetch(`https://wttr.in/${city}?format=j1`);
  const data = await response.json();
  return transformData(data);
}

👉 Questo file separa la logica dall’interfaccia (best practice).

🧾 3️⃣ types.ts (TypeScript Interfaces)

Qui definisci la struttura dei dati.

Esempio:

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  forecast: ForecastDay[];
}

Serve per:

Autocompletamento

Evitare errori

Codice più sicuro

👉 Migliora qualità e manutenzione.

🎨 4️⃣ utils.ts (Styling dinamico)

Contiene funzioni che:

Traducono condizioni meteo in classi Tailwind

Determinano colori e gradienti

Esempio concettuale:

export function getWeatherBackground(condition: string) {
  if (condition.includes("Rain")) return "bg-blue-700";
  if (condition.includes("Sunny")) return "bg-yellow-400";
}

👉 Qui nasce l’effetto “atmosfera dinamica”.

🏗️ Architettura (in breve)

Hai applicato una struttura molto pulita:

UI (App.tsx)
↓
Service Layer (weatherService.ts)
↓
Tipizzazione (types.ts)
↓
Utility Styling (utils.ts)

È un’architettura modulare e scalabile.

🎯 Valore del Progetto

✔ Esperienza immersiva
✔ Avvisi proattivi (non solo dati grezzi)
✔ UI moderna
✔ Codice organizzato
✔ Separazione logica/presentazione
✔ Scalabile facilmente (es. 7 giorni forecast, mappe, notifiche push)

🔥 In sintesi

Fredo Meteo non è solo un “viewer meteo”, ma:

Una web app reattiva, intelligente e immersiva che trasforma dati grezzi in esperienza utente.

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/4bf26082-addd-49a0-a1d8-6f1532ca6e8c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
