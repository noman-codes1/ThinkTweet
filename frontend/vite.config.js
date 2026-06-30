import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

//SOLVE THE PATH NAME... LIKE A PRODUCTION GRADE

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // resolve: {
  //   alias: {
  //     "@" : path.join(__dirname, "./src")
  //   }
  // }
});
