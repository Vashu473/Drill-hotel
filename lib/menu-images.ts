/** Working Unsplash URLs (old IDs return 404). */
export const MENU_IMAGES = {
  classicReuben:
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop&q=80",
  manhattanClub:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
};

const BROKEN_PATTERNS = ["photo-1553906059", "photo-1528735602781"];

const LEGACY_URL_MAP: Record<string, string> = {
  "https://images.unsplash.com/photo-1553906059-4d7a48ef7e9a?w=600&q=80": MENU_IMAGES.classicReuben,
  "https://images.unsplash.com/photo-1553906059-4d7a48ef7e9a?w=400&q=80": MENU_IMAGES.classicReuben,
  "https://images.unsplash.com/photo-1528735602781-9032a9598752?w=600&q=80": MENU_IMAGES.manhattanClub,
};

const BY_ITEM_NAME: Record<string, string> = {
  "Classic Reuben": MENU_IMAGES.classicReuben,
  "Manhattan Club": MENU_IMAGES.manhattanClub,
};

export function resolveMenuImage(url: string, name?: string): string {
  if (LEGACY_URL_MAP[url]) return LEGACY_URL_MAP[url];

  if (BROKEN_PATTERNS.some((p) => url.includes(p))) {
    return name && BY_ITEM_NAME[name] ? BY_ITEM_NAME[name] : url;
  }

  return url;
}

export function getMenuImageFallback(name: string): string | undefined {
  return BY_ITEM_NAME[name];
}
