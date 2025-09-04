import type { LogLevel } from '@/types';


const LOG_ENDPOINT = import.meta.env.VITE_LOG_ENDPOINT || '/api/logs';


function authHeaders() {
const token = import.meta.env.VITE_AUTH_TOKEN || localStorage.getItem('authToken');
return token ? { Authorization: `Bearer ${token}` } : {};
}


export async function logEvent(level: LogLevel, event: string, meta?: Record<string, unknown>) {
try {
const payload = {
level,
event,
meta,
ts: new Date().toISOString(),
client: {
userAgent: navigator.userAgent,
lang: navigator.language,
url: location.href,
},
};
await fetch(LOG_ENDPOINT, {
method: 'POST',
headers: { 'Content-Type': 'application/json', ...authHeaders() },
body: JSON.stringify(payload),
keepalive: true,
});
} catch (e) {
// Swallow logging errors to avoid UX impact
console.debug('[logEvent] failed', e);
}
}


// Convenience wrappers
export const log = {
debug: (event: string, meta?: Record<string, unknown>) => logEvent('debug', event, meta),
info: (event: string, meta?: Record<string, unknown>) => logEvent('info', event, meta),
warn: (event: string, meta?: Record<string, unknown>) => logEvent('warn', event, meta),
error: (event: string, meta?: Record<string, unknown>) => logEvent('error', event, meta),
};