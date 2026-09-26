import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { handleContact, readJsonBody } from "./api/contact.mjs";

function brevoContactApi(env) {
  return {
    name: "muhu-brevo-contact",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split("?")[0];
        if (path !== "/api/contact") return next();
        try {
          const payload = req.method === "POST" ? await readJsonBody(req) : {};
          const result = await handleContact({ method: req.method, payload, env });
          res.statusCode = result.status;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify(result.body));
        } catch {
          res.statusCode = 400;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ ok: false, error: "bad_request" }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [vue(), brevoContactApi(env)],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 5174,
      strictPort: true,
    },
  };
});
