import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { BrowserRouter } from "react-router";
import { bootstrapAuth } from "./features/auth/services/auth-service";

bootstrapAuth();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
