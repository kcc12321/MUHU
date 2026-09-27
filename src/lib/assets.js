/**
 * Resolves an asset path with the active deployment base URL.
 * Guarantees correct loading on GitHub Pages (/MUHU/), Vercel (/), and local development.
 * @param {string} path - Path to asset in public directory (e.g., '/assets/hero.jpg')
 * @returns {string} Base-aware resolved URL
 */
export function asset(path) {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}

export default asset;
