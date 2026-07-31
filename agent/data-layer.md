# Data Layer — projects.ts & services.ts

| Field | Value |
|-------|-------|
| **Paths** | `src/data/projects.ts`, `src/data/services.ts` |
| **Author** | 🤖 AI |
| **Category** | Data Layer |

## Purpose

Typed data files that serve as the content source for all project and service pages. They replace the hardcoded HTML from the reference site with structured TypeScript objects.

---

## projects.ts

### Type: `ProjectData`

| Field | Type | Description |
|-------|------|-------------|
| `slug` | `string` | URL segment |
| `index` | `string` | Display number ("01"–"06") |
| `title` | `string` | Project name |
| `category` | `string` | Category label |
| `context` | `string` | One-paragraph summary |
| `tags` | `string[]` | Tech stack tags |
| `meta` | `object` | Category, role, timeline, outcome |
| `systemMap?` | `object` | Optional architecture diagram data |
| `narrative` | `array` | Sections with label + content paragraphs |
| `nextProject?` | `object` | Link to next project in sequence |

### Entries (6 projects)

| # | Slug | Title |
|---|------|-------|
| 01 | `guardiantrack` | GuardianTrack |
| 02 | `vastraa` | Vastraa |
| 03 | `omniagent` | OmniAgent AI |
| 04 | `kessho` | Kessho |
| 05 | `instagram-studio` | Instagram Studio |
| 06 | `fieldnotes` | Fieldnotes |

---

## services.ts

### Type: `ServiceData`

| Field | Type | Description |
|-------|------|-------------|
| `slug` | `string` | URL segment |
| `index` | `string` | Display number ("01"–"05") |
| `title` | `string` | Service name |
| `shortDesc` | `string` | One-line overview |
| `detail` | `object` | Full service detail: heroLede, whatIsIt, whoIsItFor, included[], outcomes[], nextService? |
| `subItems` | `array` | Sub-service cards (title + desc) |

### Entries (5 services)

| # | Slug | Title |
|---|------|-------|
| 01 | `websites` | Websites |
| 02 | `software` | Software systems |
| 03 | `ai` | AI & automation |
| 04 | `restaurant` | Restaurant systems |
| 05 | `growth` | Growth & SEO |
