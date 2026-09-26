const BREVO = "https://api.brevo.com/v3";

const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const phoneOk = (value) => !value || /^\+?[\d\s().-]{7,20}$/.test(value);

const json = (status, body) => ({ status, body });

export function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 12_000) {
        reject(new Error("payload_too_large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("invalid_json"));
      }
    });
    req.on("error", reject);
  });
}

export async function handleContact({ method, payload, env }) {
  if (method !== "POST") return json(405, { ok: false, error: "method" });

  const firstName = String(payload.firstName || "").trim();
  const lastName = String(payload.lastName || "").trim();
  const email = String(payload.email || "").trim().toLowerCase();
  const phone = String(payload.phone || "").trim();
  const country = String(payload.country || "").trim();
  const message = String(payload.message || "").trim().slice(0, 3000);
  const privacy = payload.privacy === true || payload.privacy === "true";

  if (payload.website) return json(200, { ok: true });
  if (!firstName || !lastName || !emailOk(email) || !phoneOk(phone) || !privacy) {
    return json(400, { ok: false, error: "validation" });
  }

  const apiKey = env.BREVO_API_KEY;
  const listId = Number(env.BREVO_LIST_ID);
  const templateId = Number(env.BREVO_DOI_TEMPLATE_ID);
  const redirectionUrl = String(env.BREVO_DOI_REDIRECT_URL || "").trim();

  if (!apiKey || !listId) {
    return json(503, { ok: false, error: "not_configured" });
  }

  const attributes = {
    FIRSTNAME: firstName,
    LASTNAME: lastName,
    PAIS: country,
    MENSAJE: message.slice(0, 500),
    CONSENTIMIENTO: "web-form",
  };
  if (phone) attributes.SMS = phone;

  const useDoi = Boolean(templateId && redirectionUrl);
  const url = useDoi ? `${BREVO}/contacts/doubleOptinConfirmation` : `${BREVO}/contacts`;
  const body = useDoi
    ? { email, attributes, includeListIds: [listId], templateId, redirectionUrl }
    : { email, attributes, listIds: [listId], updateEnabled: true };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok && response.status !== 204) {
    return json(502, { ok: false, error: "provider" });
  }

  return json(200, { ok: true, doi: useDoi });
}
