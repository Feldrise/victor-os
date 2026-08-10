"use client";

import { useState } from "react";
import { labProcesses } from "@/content/lab";

const statusColor = {
  running: "text-[var(--vos-success)]",
  sleeping: "text-[var(--vos-info)]",
  idle: "text-[var(--vos-dim)]",
} as const;

export function LabApp() {
  const [selected, setSelected] = useState(labProcesses[0]?.id ?? null);
  const proc = labProcesses.find((p) => p.id === selected) ?? labProcesses[0];

  return (
    <div className="flex h-full flex-col font-mono text-xs">
      <div className="border-b border-[var(--vos-border)] bg-[var(--vos-panel)] px-4 py-3">
        <p className="text-[10px] tracking-widest text-[var(--vos-rose)] uppercase">
          En coulisses
        </p>
        <h2 className="font-[family-name:var(--font-instrument)] text-xl text-[var(--vos-text)]">
          Projets perso
        </h2>
      </div>

      <div className="overflow-x-auto border-b border-[var(--vos-border)]">
        <table className="w-full min-w-[520px] text-left">
          <thead className="bg-[var(--vos-bg)] text-[10px] text-[var(--vos-dim)]">
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
              const active = selected === p.id;
              return (
                <tr
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`cursor-pointer border-t border-[var(--vos-border-subtle)] ${
                    active
                      ? "bg-[rgba(232,160,74,0.12)] text-[var(--vos-text)]"
                      : "text-[var(--vos-muted)] hover:bg-[var(--vos-elevated)]"
                  }`}
                >
                  <td className="px-3 py-2 tabular-nums text-[var(--vos-amber)]">{p.pid}</td>
                  <td className="px-3 py-2">{p.user}</td>
                  <td className="px-3 py-2 tabular-nums">{p.cpu.toFixed(1)}</td>
                  <td className="px-3 py-2 tabular-nums">{p.mem.toFixed(1)}</td>
                  <td className={`px-3 py-2 ${statusColor[p.status]}`}>{p.status}</td>
                  <td className="truncate px-3 py-2">{p.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {proc && (
        <div className="flex-1 space-y-3 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-[family-name:var(--font-instrument)] text-lg text-[var(--vos-amber)]">
              {proc.name}
            </h3>
            <span className={`text-[10px] ${statusColor[proc.status]}`}>{proc.status}</span>
          </div>
          <p className="text-[11px] text-[var(--vos-dim)]">$ {proc.command}</p>
          <p className="font-sans text-sm leading-relaxed text-[var(--vos-muted)]">
            {proc.detail}
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded border border-[var(--vos-border)] bg-[var(--vos-bg)]/50 p-3">
              <p className="text-[10px] text-[var(--vos-dim)]">CPU</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--vos-border)]">
                <div
                  className="h-full bg-[var(--vos-copper)]"
                  style={{ width: `${Math.min(100, proc.cpu)}%` }}
                />
              </div>
              <p className="mt-1 tabular-nums text-[var(--vos-text)]">{proc.cpu}%</p>
            </div>
            <div className="rounded border border-[var(--vos-border)] bg-[var(--vos-bg)]/50 p-3">
              <p className="text-[10px] text-[var(--vos-dim)]">MEM</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--vos-border)]">
                <div
                  className="h-full bg-[var(--vos-info)]"
                  style={{ width: `${Math.min(100, proc.mem)}%` }}
                />
              </div>
              <p className="mt-1 tabular-nums text-[var(--vos-text)]">{proc.mem}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
