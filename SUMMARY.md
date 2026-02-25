# Riassunto del Progetto: Fredo Meteo

## Panoramica
**Fredo Meteo** è un'applicazione web moderna e reattiva progettata per fornire previsioni meteorologiche accurate e avvisi in tempo reale. L'app combina un'estetica curata con funzionalità avanzate per offrire un'esperienza utente immersiva.

## Funzionalità Principali
1.  **Rilevamento Posizione**: Utilizza l'API di geolocalizzazione del browser per mostrare immediatamente il meteo locale all'apertura.
2.  **Ricerca Globale**: Una barra di ricerca intuitiva permette di consultare le condizioni meteo di qualsiasi città nel mondo.
3.  **Sistema di Avvisi Gravi**: Un algoritmo integrato analizza i dati per generare avvisi automatici (es. temporali, inondazioni, ondate di calore) con diversi livelli di gravità.
4.  **Atmosfera Dinamica**: Lo sfondo e i colori dell'interfaccia cambiano dinamicamente in base alle condizioni meteorologiche correnti (soleggiato, piovoso, nuvoloso, ecc.).
5.  **Dettagli Tecnici**: Visualizzazione di parametri come umidità, velocità del vento, indice UV, visibilità e pressione atmosferica.
6.  **Previsioni a 3 Giorni**: Schede riassuntive per i giorni successivi con temperature massime e minime.

## Stack Tecnologico
-   **Frontend**: React 19 con TypeScript.
-   **Styling**: Tailwind CSS per un design responsive e moderno.
-   **Animazioni**: Motion (framer-motion) per transizioni fluide.
-   **Icone**: Lucide React.
-   **Dati Meteo**: Integrazione con l'API di `wttr.in`.
-   **Branding**: Personalizzato con "Fredo Intelligence".

## Struttura del Codice
-   `src/App.tsx`: Componente principale con logica UI e gestione dello stato.
-   `src/weatherService.ts`: Servizio per il recupero dei dati e la generazione degli avvisi.
-   `src/types.ts`: Definizioni delle interfacce TypeScript per la coerenza dei dati.
-   `src/utils.ts`: Funzioni di utilità per lo styling condizionale.

---
*Creato con precisione da Fredo Intelligence.*
