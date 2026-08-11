# constants.ts — Core Constants

| Field | Value |
|-------|-------|
| **Path** | `src/constants.ts` |
| **Author** | 🤖 AI |
| **Category** | Configuration / Foundation |

## Purpose

Defines global constant values used across both compile-time metadata generation and client-side integrations.

## Core Exports

### `BASE_URL`

- **Value**: `"https://dumbbasss.vercel.app"`
- **Type**: `string`
- **Description**: The canonical production deployment URL for the studio.

## Usage

Used as the metadata base for generating absolute URLs for:
- Robots.txt (`src/app/robots.ts`)
- XML Sitemap (`src/app/sitemap.ts`)
- OpenGraph (OG) image templates and page URLs (`src/app/layout.tsx`)
