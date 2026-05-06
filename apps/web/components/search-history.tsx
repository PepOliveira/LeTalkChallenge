"use client";

import { useState } from "react";
import { History, X, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { HistoryEntry, removeEntry, clearHistory } from "@/lib/history";
import { cn } from "@/lib/utils";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "agora mesmo";
  if (mins < 60) return `há ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `há ${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `há ${days}d`;
}

interface SearchHistoryProps {
  entries: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onEntriesChange: (entries: HistoryEntry[]) => void;
}

export function SearchHistory({ entries, onSelect, onEntriesChange }: SearchHistoryProps) {
  const [open, setOpen] = useState(true);

  if (entries.length === 0) return null;

  function handleRemove(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    onEntriesChange(removeEntry(id));
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    clearHistory();
    onEntriesChange([]);
  }

  return (
    <div className="glass rounded-2xl shadow-xl shadow-blue-900/8 overflow-hidden">
      <div className="flex items-center px-5 py-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex-1 flex items-center gap-2 text-left hover:bg-white/20 transition-colors"
        >
          <History className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Histórico
          </span>
          <span className="text-xs text-muted-foreground bg-muted/60 rounded-full px-2 py-0.5">
            {entries.length}
          </span>
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={handleClear}
            className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            title="Limpar histórico"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => setOpen((o) => !o)} className="p-1">
            {open ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col divide-y divide-border/40 max-h-[340px] overflow-y-auto">
          {entries.map((entry) => {
            const name = entry.empresa.nome_fantasia || entry.empresa.razao_social;
            return (
              <div
                key={entry.id}
                className="group flex items-start justify-between gap-3 px-5 py-3.5 hover:bg-white/30 transition-colors"
              >
                <button
                  onClick={() => onSelect(entry)}
                  className="flex flex-col gap-0.5 min-w-0 flex-1 text-left"
                >
                  <span className="text-sm font-medium text-foreground truncate">{name}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {entry.lead.nome}
                    {entry.lead.cargo ? ` · ${entry.lead.cargo}` : ""}
                  </span>
                  <span className="text-[10px] text-muted-foreground/70 mt-0.5">
                    {timeAgo(entry.timestamp)}
                  </span>
                </button>
                <button
                  onClick={(e) => handleRemove(e, entry.id)}
                  className={cn(
                    "shrink-0 p-1 rounded text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors",
                    "opacity-0 group-hover:opacity-100",
                  )}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
