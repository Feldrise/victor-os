"use client";

import { useState } from "react";
import {
  getLabProcess,
  labProcesses,
  type LabProcess,
  type LabStatus,
} from "@/content/lab";

const statusColor: Record<LabStatus, string> = {
  running: "text-[var(--vos-success)]",
  sleeping: "text-[var(--vos-info)]",
  idle: "text-[var(--vos-text-dim)]",
};

export function LabApp() {
  const [selectedId, setSelectedId] = useState(labProcesses[0]?.id ?? "");
  const preview = getLabProcess(selectedId) ?? labProcesses[0];

  return (
    <div className="vos-scroll relative flex h-full min-h-0 flex-col overflow-hidden">
      <Overview
        selectedId={selectedId}
        preview={preview}
        onSelect={setSelectedId}
      />
    </div>
  );
}

function Overview({
  selectedId,
  preview,
  onSelect,
}: {
  selectedId: string;
  preview: LabProcess | undefined;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      <header className="shrink-0 border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-5 py-5">
        <p className="text-[10px] tracking-[0.2em] text-[var(--vos-amber)] uppercase">
          En coulisses
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-instrument)] text-2xl text-[var(--vos-text)]">
          Labo
        </h2>
        <p className="mt-1 max-w-md text-xs leading-relaxed text-[var(--vos-text-muted)]">
          Processus perso — sélectionne une ligne.
        </p>
      </header>

      <div className="overflow-x-auto border-b border-[var(--vos-border)] font-mono text-xs">
        <table className="w-full min-w-[520px] text-left">
          <thead className="bg-[var(--vos-bg)] text-[10px] text-[var(--vos-text-dim)]">
            <tr>
              <th className="px-3 py-2 font-normal">PID</th>
              <th className="px-3 py-2 font-normal">USER</th>
              <th className="px-3 py-2 font-normal">CPU%</th>
              <th className="px-3 py-2 font-normal">MEM%</th>
              <th className="px-3 py-2 font-normal">STAT</th>
              <th className="px-3 py-2 font-normal">COMMAND</th>
            </tr>
          </thead>
          <tbody>
            {labProcesses.map((p) => {
              const active = selectedId === p.id;
              return (
                <tr
                  key={p.id}
                  onClick={() => onSelect(p.id)}
                  className={`cursor-pointer border-t border-[var(--vos-border-subtle)] ${
                    active
                      ? "bg-[rgba(232,160,74,0.12)] text-[var(--vos-text)]"
                      : "text-[var(--vos-text-muted)] hover:bg-[var(--vos-bg-elevated)]"
                  }`}
                >
                  <td className="px-3 py-2 tabular-nums text-[var(--vos-amber)]">
                    {p.pid}
                  </td>
                  <td className="px-3 py-2">{p.user}</td>
                  <td className="px-3 py-2 tabular-nums">
                    {p.cpu.toFixed(1)}
                  </td>
                  <td className="px-3 py-2 tabular-nums">
                    {p.mem.toFixed(1)}
                  </td>
                  <td className={`px-3 py-2 ${statusColor[p.status]}`}>
                    {p.status}
                  </td>
                  <td className="truncate px-3 py-2">{p.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {preview && (
        <div className="vos-scroll flex-1 space-y-3 overflow-y-auto p-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <h3
              className="font-[family-name:var(--font-instrument)] text-lg"
              style={{ color: preview.accent }}
            >
              {preview.name}
            </h3>
            <span className={`text-[10px] ${statusColor[preview.status]}`}>
              {preview.status}
            </span>
          </div>
          <p className="text-[11px] text-[var(--vos-text-dim)]">
            $ {preview.command}
          </p>
          <p className="font-sans text-sm leading-relaxed text-[var(--vos-text-muted)]">
            {preview.detail}
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded border border-[var(--vos-border)] bg-[var(--vos-bg)]/50 p-3">
              <p className="text-[10px] text-[var(--vos-text-dim)]">CPU</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--vos-border)]">
                <div
                  className="h-full bg-[var(--vos-copper)]"
                  style={{ width: `${Math.min(100, preview.cpu)}%` }}
                />
              </div>
              <p className="mt-1 tabular-nums text-[var(--vos-text)]">
                {preview.cpu}%
              </p>
            </div>
            <div className="rounded border border-[var(--vos-border)] bg-[var(--vos-bg)]/50 p-3">
              <p className="text-[10px] text-[var(--vos-text-dim)]">MEM</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--vos-border)]">
                <div
                  className="h-full bg-[var(--vos-info)]"
                  style={{ width: `${Math.min(100, preview.mem)}%` }}
                />
              </div>
              <p className="mt-1 tabular-nums text-[var(--vos-text)]">
                {preview.mem}%
              </p>
            </div>
          </div>
          <div className="pt-1">
            <p className="text-[10px] text-[var(--vos-text-dim)]">PROGRESS</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--vos-border)]">
              <div
                className="h-full rounded-full transition-[width]"
                style={{
                  width: `${preview.progress}%`,
                  background: preview.accent,
                }}
              />
            </div>
            <p className="mt-1 tabular-nums text-[var(--vos-text)]">
              {preview.progress}%
            </p>
          </div>
        </div>
      )}
    </>
  );
}
