import { useEffect, useMemo, useState } from 'react';
{error && <div className="error" role="alert" style={{marginTop:8}}>{error}</div>}


{active && (
<div style={{marginTop:16}} className="card">
<div className="row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
<div>
<div style={{fontWeight:700}}>Details: /{active.code}</div>
<div className="tag">{active.longUrl}</div>
</div>
<button className="button" onClick={() => setActive(null)}>Close</button>
</div>


<div className="table-wrap" style={{marginTop:12}}>
<table className="table">
<thead>
<tr>
<th>When</th>
<th>Geo</th>
<th>Referer</th>
<th>Agent</th>
<th>IP</th>
</tr>
</thead>
<tbody>
{(active.events || []).map((ev, i) => (
<tr key={i}>
<td>{new Date(ev.at).toLocaleString()}</td>
<td>{[ev.city, ev.region, ev.country].filter(Boolean).join(', ') || '—'}</td>
<td>{ev.referer || '—'}</td>
<td title={ev.userAgent}>{ev.userAgent?.slice(0, 40) || '—'}{(ev.userAgent && ev.userAgent.length > 40) ? '…' : ''}</td>
<td>{ev.ip || '—'}</td>
</tr>
))}
{(!active.events || active.events.length === 0) && (
<tr><td colSpan={5} className="tag">No click events yet.</td></tr>
)}
</tbody>
</table>
</div>
</div>
)}
</div>
);
}