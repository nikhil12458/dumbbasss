# font.ts — Font Configuration

| Field | Value |
|-------|-------|
| **Path** | `src/app/font.ts` |
| **Author** | 👤 User |
| **Category** | Foundation / Typography |

## Purpose

Configures four Google Fonts via Next.js's `next/font/google` module for automatic self-hosting and optimization.

## Fonts

| Export | Font | CSS Variable | Usage |
|--------|------|-------------|-------|
| `inter` | Inter | `--font-inter` | Body text (`font-sans`) |
| `spaceGrotesk` | Space Grotesk | `--font-space-grotesk` | Headings (`font-display`) |
| `jetbrainsMono` | JetBrains Mono | `--font-jetbrains-mono` | Labels, code (`font-mono`) |
| `fraunces` | Fraunces | `--font-fraunces` | Editorial accents (`font-serif`) |

All fonts use `display: "swap"` and the `"latin"` subset.
