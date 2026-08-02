import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";

const TSCALE_MACHINE = import.meta.env.TSCALE_MACHINE;
const TAILNET_NAME = import.meta.env.TAILNET_NAME;
const FULL_DNS = `${TSCALE_MACHINE}.${TAILNET_NAME}.ts.net`;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: {
      cert: fs.readFileSync(`./certs/${FULL_DNS}.crt`),
      key: fs.readFileSync(`./certs/${FULL_DNS}.key`),
    },
    host: true,
  },
});
