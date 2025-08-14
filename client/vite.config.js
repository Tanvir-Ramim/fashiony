import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This makes the server listen on all addresses, including the local network.
    // port: 3000, // Optional: specify a different port if needed
  },
});
