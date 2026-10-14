export type PreviewPage = { path: string; title: string; description: string; headline: string; label: string; image?: string; type?: string; aliases?: string[] };
export const siteOrigin: string;
export function normalizePath(path: string): string;
export function findPage(path: string, pages: PreviewPage[]): PreviewPage;
export function escapeHtml(value: string): string;
export function renderPreviewHtml(html: string, page: PreviewPage): string;
