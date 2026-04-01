import React from "react";
import ReactDOM from "react-dom/client";
import "@podcast/ui/src/index.css";
import { App } from "@podcast/ui";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
