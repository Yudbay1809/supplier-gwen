import type { Rack } from "../data/racks";
import { kontrabonSearchItems, stockSearchItems } from "../data/dashboard";

type SearchItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
};

export function buildPromosiSearchItems(racks: Rack[]): SearchItem[] {
  return racks.slice(0, 4).map((rack) => ({
    id: rack.id,
    title: `Promosi ${rack.name}`,
    subtitle: rack.location,
    href: `/media/${rack.id}`,
  }));
}

export function buildDashboardSearchResults(query: string, racks: Rack[]): SearchItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }
  const promosiItems = buildPromosiSearchItems(racks);
  return [...kontrabonSearchItems, ...stockSearchItems, ...promosiItems].filter(
    (item) => `${item.title} ${item.subtitle} ${item.id}`.toLowerCase().includes(normalized)
  );
}

export function highlightText(text: string, query: string) {
  const trimmed = query.trim();
  if (!trimmed) return text;
  const lower = text.toLowerCase();
  const index = lower.indexOf(trimmed.toLowerCase());
  if (index === -1) return text;
  const before = text.slice(0, index);
  const match = text.slice(index, index + trimmed.length);
  const after = text.slice(index + trimmed.length);
  return { before, match, after };
}
