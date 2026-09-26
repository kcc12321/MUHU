import { createServer } from "node:http";
import { handleContact, readJsonBody } from "../api/contact.mjs";

const port = Number(process.env.PORT || 8787);

createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  if (url.pathname !== "/api/contact") {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: false, error: "not_found" }));
    return;
  }

  try {
    const payload = req.method === "POST" ? await readJsonBody(req) : {};
    const result = await handleContact({ method: req.method, payload, env: process.env });
    res.writeHead(result.status, { "content-type": "application/json" });
    res.end(JSON.stringify(result.body));
  } catch {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: false, error: "bad_request" }));
  }
}).listen(port, () => {
  console.info(`MUHU contact API on http://localhost:${port}/api/contact`);
});
