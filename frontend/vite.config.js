import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const TSCALE_MACHINE = env.TSCALE_MACHINE;
  const TAILNET_NAME = env.TAILNET_NAME;
  const FULL_DNS = `${TSCALE_MACHINE}.${TAILNET_NAME}.ts.net`;

  return {
    plugins: [react(), tailwindcss()],
    server: {
      https: {
        cert: fs.readFileSync(`./certs/${FULL_DNS}.crt`),
        key: fs.readFileSync(`./certs/${FULL_DNS}.key`),
      },
      host: true,
    },
  };
});
