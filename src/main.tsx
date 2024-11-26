import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MoviesProvider } from "./context/MoviesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MoviesProvider>
      <App />
    </MoviesProvider>
  </StrictMode>
);
