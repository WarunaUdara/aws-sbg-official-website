# AWS SBG USJ Design System & Brand Guidelines

Official design system for the **AWS Student Building Guild (SBG) at University of Sri Jayewardenepura (USJ)**.

This system establishes the visual standards, token definitions, typography, geometric grid language, and layout rules derived directly from the official brand identity. **All developers, designers, and AI agents must adhere to these standards while retaining creative flexibility to innovate.**

---

## 1. Brand Essence & Visual Language

- **Motto / Tagline**: *"From Students to Builders"*
- **Core Identity**: Technical, architectural, modular, high-contrast, energetic, and clean.
- **Architectural Motifs**:
  - **The Coordinate Grid**: Thin, crisp 1px lines dividing surfaces into modular square cells (like engineering grid paper and AWS architectural diagrams).
  - **Obsidian Surfaces**: A nearly black canvas and graphite panels keep the interface calm; orange is reserved for action, status, and orientation.
  - **Editorial Restraint**: Square geometry, hairline rules, flat surfaces, and generous negative space provide the visual discipline of the supplied Render reference without copying its branding.
  - **Builder Blocks & Mosaics**: Stepped square tiles (orange and deep slate) creating dynamic pixelated silhouettes and structural accents.
  - **The Builder Chip Logo**: A 7x7 modular microprocessor glyph with 3 pins per side and a hollow square core, symbolizing student cloud builders crafting hardware & software.
  - **Technical Monospace Signatures**: Clean monospace font for organizational sign-offs, metadata, and status badges.

---

## 2. Color Palette & Tokens

### Primary Brand Palette
| Token Name | Hex Code | OKLCH | Usage |
|---|---|---|---|
| `builder-orange` | `#FF9900` | `oklch(0.72 0.18 55.0)` | Primary brand color, full-bleed hero fills, prominent CTAs, chip glyph, active accents |
| `builder-orange-light` | `#FFB84D` | `oklch(0.80 0.14 62.0)` | Hover states, glowing edges, gradient highlights |
| `builder-dark` | `#0D0D0D` | `oklch(0.14 0 0)` | Primary obsidian canvas background |
| `builder-surface` | `#151515` | `oklch(0.20 0 0)` | Surface cards, dark mosaic blocks, anchored badge blocks |
| `builder-surface-hover` | `#1D1D1D` | `oklch(0.25 0 0)` | Card hover states, secondary button backgrounds |

### Monochrome & Neutral Tokens
| Token Name | Hex Code | Usage |
|---|---|---|
| `builder-white` | `#FFFFFF` | Headlines, primary text on dark backgrounds |
| `builder-slate-300` | `#CBD5E1` | Secondary body text, readable descriptions |
| `builder-slate-500` | `#64748B` | Subtle metadata, timestamps, disabled indicators |

### Grid Line & Border Tokens
| Token Name | RGBA Value | Usage |
|---|---|---|
| `builder-grid-dark` | `rgba(255, 255, 255, 0.08)` | 1px grid coordinate lines on dark surfaces |
| `builder-grid-orange` | `rgba(0, 0, 0, 0.12)` | 1px grid coordinate lines on orange surfaces |
| `builder-border-subtle`| `rgba(255, 255, 255, 0.14)` | Card borders, container dividers, technical frames |

---

## 3. Typography System

### Primary Font: **Roobert Regular** (Display Sans)
- **Role**: Display headlines, high-impact titles (`.font-display`).
- **CSS Variable**: `--font-primary` / `--font-display`
- **Source**: `public/RoobertTRIAL-Regular-BF67243fd53fdf2.otf`, loaded as `Roobert`.
- **Characteristics**: Clean, technical, wide display rhythm with a calm editorial silhouette.
- **Hierarchy Scale**:
  - `Display / Hero`: `text-5xl` to `text-7xl` (`font-normal`, leading `1.08`, tracking `-0.035em`)
  - `H1 / Section`: `text-3xl` to `text-4xl` (`font-normal`, leading `1.1`)
  - `H2 / Component`: `text-xl` to `text-2xl` (`font-medium`)

### Secondary Font: **Google Sans Flex** (Sans-Serif)
- **Role**: Body copy, descriptions, navigation links, button text, card content (`.font-secondary`, `.font-sans`).
- **CSS Variable**: `--font-secondary` (mapped globally to `--font-sans` and root `body`)
- **Variation Settings**: `font-optical-sizing: auto; font-variation-settings: "slnt" 0, "wdth" 100, "GRAD" 0, "ROND" 0;`
- **Characteristics**: Ultra-clean, human-optimized legibility, variable axis responsiveness.

### Monospace Font: **JetBrains Mono** (Monospace)
- **Role**: Brand signatures, section eyebrows, terminal headings, code snippets, timestamps, tags, and technical metadata (`.font-mono`, `.font-code`).
- **CSS Variable**: `--font-mono`
- **Usage Rules**:
  - The organization signature: `AWS Student Builder Group at University of Sri Jayewardenepura` MUST always be rendered in monospace.
  - Section eyebrow tags (`[ CHAPTER 01 ]`, `[ UPCOMING WORKSHOPS ]`) use monospace uppercase with tracked spacing (`tracking-wider`).

---

## 4. Geometric & Layout Components

### A. The Modular Grid System (`.builder-grid`)
  - Backgrounds feature an architectural square grid (cell sizes: `48px`, with `240px` major divisions in `.blueprint-grid`).
- Used on hero headers, section dividers, and featured callout banners.
- Both dark-grid (`bg-grid-dark`) and orange-grid (`bg-grid-orange`) variants are supported.

### B. Builder Mosaics (Stepped Blocks)
- Clustered or stepped square blocks (e.g. 2x2, 3x1, L-shaped) of `#FF9900` and `#151515`.
- Corners on mosaic blocks are strictly geometric (`rounded-none` or sharp `0px` radius) to maintain the pixel-brick aesthetic.

### C. The 7x7 Builder Chip Glyph
```
  ■ ■ ■        <- Top 3 pins
■ █ █ █ █ █ ■  <- Row 1 (pins on L/R)
  █       █    <- Hollow center
■ █       █ ■  <- Middle pin
  █       █    <- Hollow center
■ █ █ █ █ █ ■  <- Row 5 (pins on L/R)
  ■ ■ ■        <- Bottom 3 pins
```
- Available in:
  - `orange-on-dark` (standard icon)
  - `dark-on-orange` (used on orange hero blocks)
  - `framed-block` (embedded inside square badge block with monospace subtitle)

### D. Anchored Brand Corners
- In banner or poster layouts, anchor an AWS smile logo block in the top-corner and the Builder Chip Logo block in the bottom-corner.

---

## 5. Component Standards for Agents & Developers

1. **Buttons**:
   - `Primary`: Background `#FF9900`, text `#0D0D0D`, bold font, crisp square edge.
   - `Technical / Outline`: Transparent background, 1px neutral border, hover border `#FF9900`.
   - `Secondary / Dark`: Background `#151515`, text white, 1px neutral border.
2. **Cards**:
   - Background `#151515`; avoid heavy gradients, shadows, and glass effects.
   - 1px neutral border, transitioning to a restrained orange edge on hover with a subtle lift.
3. **Badges**:
   - Square or subtly rounded (`rounded-sm` or `rounded-md`), monospace uppercase text, 1px technical border.

---

## 6. Creative Flexibility for Agents

Agents and developers have creative freedom to:
- Compose custom grid layouts and mosaic arrangements for new features and hackathons.
- Add subtle terminal-style interactions (blinking carets, typewriter effects, matrix-style data streams).
- Create event-specific illustrations and banner graphics using the square-grid coordinate system.
- Build interactive tabs, data visualization widgets, and cloud architecture calculators following these token rules.
