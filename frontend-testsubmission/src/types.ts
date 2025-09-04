export type ShortUrl = {
id: string; // UUID (backend)
code: string; // shortcode, e.g., "abcd1"
longUrl: string;
shortUrl: string; // full short URL (server returns), else derive from code
createdAt: string; // ISO
clicks: number;
};


export type ClickEvent = {
at: string; // ISO timestamp
ip?: string;
userAgent?: string;
country?: string;
region?: string;
city?: string;
referer?: string;
};


export type UrlWithStats = ShortUrl & {
lastClickedAt?: string | null;
events?: ClickEvent[]; // optional detailed timeline
};


export type ApiError = { message: string; status?: number; details?: unknown };


export type LogLevel = 'debug' | 'info' | 'warn' | 'error';


// ================