import { FormEvent, useEffect, useMemo, useState } from 'react';
try {
const data = await listUrls();
setList(data);
} catch (e: any) {
setError(e?.message || 'Failed to load URLs.');
}
}


useEffect(() => { refreshList(); }, []);


async function handleSubmit(e: FormEvent) {
e.preventDefault();
setError(null);
setMessage(null);
if (!valid) {
setError('Please enter a valid URL starting with http:// or https://');
return;
}
setBusy(true);
try {
const res = await createShortUrl(longUrl.trim());
setMessage(`Short URL created: ${res.shortUrl || location.origin + '/' + res.code}`);
setLongUrl('');
await refreshList();
} catch (e: any) {
setError(e?.message || 'Something went wrong.');
await log.error('shorten_failed', { message: e?.message });
} finally {
setBusy(false);
}
}


return (
<div className="card">
<form onSubmit={handleSubmit} className="row" aria-label="URL shortener form">
<input
className="input"
type="url"
placeholder="Paste a long URL (https://...)"
value={longUrl}
onChange={(e) => setLongUrl(e.target.value)}
aria-invalid={!!error}
aria-describedby="helper"
/>
<button className="button" disabled={!valid || busy}>{busy ? 'Shortening…' : 'Shorten'}</button>
</form>
<div id="helper" className="helper">Example: https://example.com/very/long/path?with=query&and=params
{' '}• Press <span className="kbd">Enter</span> to submit
</div>
{error && <div className="error" role="alert">{error}</div>}
{message && <div className="success">{message}</div>}


<div className="list" aria-live="polite">
{list.length > 0 && list.map(item => (
<ShortUrlItem key={item.id} item={item} />
))}
{list.length === 0 && (
<div className="helper">No URLs yet. Create your first short link above.</div>
)}
</div>
</div>
);
}