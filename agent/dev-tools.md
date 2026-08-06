# AgentationProvider.tsx — Development Tools

| Field | Value |
|-------|-------|
| **Path** | `src/components/dev/AgentationProvider.tsx` |
| **Author** | 🤖 AI |
| **Category** | Dev Tools |

## Purpose

A development-only wrapper component injected at the root layout. It enables internal tooling features that only run during development or local agentic sessions.

## What it does

Currently acts as a placeholder for injecting script tags, debug outlines, or agentic overlays. In a production build, this file should ideally compile to a no-op or be stripped out.

## Integration

Injected via `src/app/layout.tsx` at the bottom of the `<main>` block:
```tsx
  <main className="flex-1">
    {children}
    <AgentationProvider />
  </main>
```
