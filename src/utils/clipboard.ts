export async function copyToClipboard(text: string) {
if (navigator.clipboard?.writeText) {
await navigator.clipboard.writeText(text);
return true;
}
const ta = document.createElement('textarea');
ta.value = text;
ta.style.position = 'fixed';
ta.style.opacity = '0';
document.body.appendChild(ta);
ta.focus();
ta.select();
try { document.execCommand('copy'); return true; } finally { document.body.removeChild(ta); }
}