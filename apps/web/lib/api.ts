const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
const REQUEST_TIMEOUT_MS = 30000;

export async function post<T>(path: string, body: FormData | object): Promise<T> {
  const isForm = body instanceof FormData;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: isForm ? undefined : { 'Content-Type': 'application/json' },
      body: isForm ? body : JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
    return res.json();
  } finally {
    window.clearTimeout(timeout);
  }
}
