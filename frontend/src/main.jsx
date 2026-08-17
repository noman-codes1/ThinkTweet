import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./utils/AuthProvider.jsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>

    {/* This is a vercel analytics not your "analytics"
    #tip: always keep them in different file*/}
    <Analytics />
    <SpeedInsights />
  </BrowserRouter>,
);
