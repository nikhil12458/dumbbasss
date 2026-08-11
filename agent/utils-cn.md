# cn.ts — Styling Class Merger Utility

| Field | Value |
|-------|-------|
| **Path** | `src/utils/cn.ts` |
| **Author** | 🤖 AI |
| **Category** | Utility / Styling |

## Purpose

A standard utility to merge Tailwind CSS classes dynamically without style conflicts or order specificity issues. It serves as the styling glue for custom UI primitives.

## Exports

### `cn(...inputs: ClassValue[])`

- **Inputs**: Variadic list of class values (strings, arrays, objects, conditionals).
- **Return Type**: `string` of merged/resolved CSS classes.

## Features

- **Conditional Classes**: Combines `clsx` mapping to support conditional class application (e.g. `{ 'bg-ink': active }`).
- **Conflict Resolution**: Combines `tailwind-merge` (`twMerge`) to resolve style conflicts (e.g., if `p-4` and `p-6` are both supplied, the last class overrides the earlier one instead of leaving layout resolution up to the browser).
