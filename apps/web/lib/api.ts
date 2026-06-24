const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export async function post<T>(path: string, body: FormData | object): Promise<T> {
  const isForm = body instanceof FormData;
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: isForm ? undefined : { 'Content-Type': 'application/json' },
    body: isForm ? body : JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
  return res.json();
}
