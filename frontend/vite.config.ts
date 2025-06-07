import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/": "http://localhost:8080/",
      "/flygpriser": "http://localhost:8080/flygpriser",
      "booking":"http://localhost:8080/booking",
      "/api": "http://localhost:8080",
    },
  },
});
