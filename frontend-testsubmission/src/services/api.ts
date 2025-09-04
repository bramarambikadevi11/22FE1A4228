import type { ShortUrl, UrlWithStats } from '@/types';
import { log } from './logger';


const API_BASE = import.meta.env.VITE_API_BASE || '/api';


function authHeaders() {
const token = import.meta.env.VITE_AUTH_TOKEN || localStorage.getItem('authToken');
return token ? { Authorization: `Bearer ${token}` } : {};
}


async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 15000);
try {
const res = await fetch(input, {
...init,
headers: { 'Content-Type': 'application/json', ...(init?.headers || {}), ...authHeaders() },
signal: controller.signal,
});
if (!res.ok) {
const text = await res.text();
let err: any = text;
try { err = JSON.parse(text); } catch {}
await log.warn('api_error', { url: String(input), status: res.status, body: err });
throw { message: err?.message || res.statusText, status: res.status, details: err };
}
return (await res.json()) as T;
} finally {
clearTimeout(id);
}
}


export async function createShortUrl(longUrl: string): Promise<ShortUrl> {
const payload = { longUrl };
const data = await http<ShortUrl>(`${API_BASE}/shorten`, { method: 'POST', body: JSON.stringify(payload) });
await log.info('shorten_success', { longUrl, code: data.code });
return data;
}


export async function listUrls(): Promise<ShortUrl[]> {
const data = await http<ShortUrl[]>(`${API_BASE}/urls`, { method: 'GET' });
return data;
}


export async function getUrlStats(code: string): Promise<UrlWithStats> {
const data = await http<UrlWithStats>(`${API_BASE}/urls/${encodeURIComponent(code)}/stats`, { method: 'GET' });
return data;
}