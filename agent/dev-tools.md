# AgentationProvider.tsx — Development Tools

| Field | Value |
|-------|-------|
| **Path** | `src/components/dev/AgentationProvider.tsx` |
| **Author** | 🤖 AI |
| **Category** | Dev Tools |

## Purpose

A development-only wrapper component injected at the root layout. It enables internal tooling features that only run during development or local agentic sessions.

## What it does

- **Development Only Check**: Inspects `process.env.NODE_ENV` and returns `null` if not in `"development"` mode, ensuring that agentic overlays and tools are excluded from production builds.
- **Dynamic Import**: Dynamically imports the `Agentation` overlay component from the `"agentation"` package with `ssr: false` to ensure it only evaluates on client-side rendering.

## Integration

Injected via `src/app/layout.tsx` at the bottom of the `<main>` block:
```tsx
  <main className="flex-1">
    {children}
    <AgentationProvider />
  </main>
```

