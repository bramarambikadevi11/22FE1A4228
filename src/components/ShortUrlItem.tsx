import type { ShortUrl } from '@/types';
import { copyToClipboard } from '@/utils/clipboard';
import { useState } from 'react';


export function ShortUrlItem({ item }: { item: ShortUrl }) {
const [copied, setCopied] = useState(false);
const short = item.shortUrl || `${location.origin}/${item.code}`;


async function onCopy() {
await copyToClipboard(short);
setCopied(true);
setTimeout(() => setCopied(false), 1500);
}


return (
<div className="item">
<div>
<a href={short} target="_blank" rel="noreferrer">{short}</a>
<div className="tag">→ {item.longUrl}</div>
</div>
<div className="row">
<span className="badge">{item.clicks} clicks</span>
<button className="button" onClick={onCopy}>{copied ? 'Copied' : 'Copy'}</button>
</div>
</div>
);
}