import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // ✅ Ajout de BrowserRouter
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>  {/* 🔥 Important : Encapsule App */}
    <App />
  </BrowserRouter>
);
