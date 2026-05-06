import { Lead, EnrichedCompany } from "./types";

export interface HistoryEntry {
  id: string;
  timestamp: string;
  lead: Lead;
  empresa: EnrichedCompany;
}

const KEY = "letalk:search_history";
const MAX_ENTRIES = 20;

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveEntry(lead: Lead, empresa: EnrichedCompany): HistoryEntry {
  const entry: HistoryEntry = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    lead,
    empresa,
  };
  const history = [entry, ...loadHistory()].slice(0, MAX_ENTRIES);
  localStorage.setItem(KEY, JSON.stringify(history));
  return entry;
}

export function removeEntry(id: string): HistoryEntry[] {
  const history = loadHistory().filter((e) => e.id !== id);
  localStorage.setItem(KEY, JSON.stringify(history));
  return history;
}

export function clearHistory(): void {
  localStorage.removeItem(KEY);
}
