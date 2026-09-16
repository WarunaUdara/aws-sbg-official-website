# AWS SBG USJ Design System & Brand Guidelines

Official design system for the **AWS Student Building Guild (SBG) at University of Sri Jayewardenepura (USJ)**.

This system establishes the visual standards, token definitions, typography, geometric grid language, and layout rules derived directly from the official brand identity. **All developers, designers, and AI agents must adhere to these standards while retaining creative flexibility to innovate.**

---

## 1. Brand Essence & Visual Language

- **Motto / Tagline**: *"From Students to Builders"*
- **Core Identity**: Technical, architectural, modular, high-contrast, energetic, and clean.
- **Architectural Motifs**:
  - **The Coordinate Grid**: Thin, crisp 1px lines dividing surfaces into modular square cells (like engineering grid paper and AWS architectural diagrams).
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
| `builder-dark` | `#0A0E17` | `oklch(0.14 0.02 260.0)` | Primary dark canvas background, high-contrast text on orange surfaces |
| `builder-surface` | `#161F2E` | `oklch(0.22 0.03 255.0)` | Surface cards, dark mosaic blocks, anchored badge blocks |
| `builder-surface-hover` | `#1E2B3E` | `oklch(0.26 0.04 255.0)` | Card hover states, secondary button backgrounds |

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
| `builder-border-subtle`| `rgba(255, 153, 0, 0.20)` | Card borders, container dividers, technical frames |

---

## 3. Typography System

### Primary Font: **Space Grotesk** (Sans-Serif)
- **Role**: Display headlines, high-impact titles (`.font-display`).
- **CSS Variable**: `--font-primary` / `--font-display`
- **Characteristics**: Crisp geometric grotesque, architectural proportions, high legibility.
- **Hierarchy Scale**:
  - `Display / Hero`: `text-5xl` to `text-7xl` (`font-bold` / `font-black`, leading tight: `1.05 - 1.1`, tracking tight: `-0.02em`)
  - `H1 / Section`: `text-3xl` to `text-4xl` (`font-extrabold`, leading: `1.15`)
  - `H2 / Component`: `text-xl` to `text-2xl` (`font-bold`)

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
- Backgrounds feature an architectural square grid (cell sizes: `40px` or `48px`).
- Used on hero headers, section dividers, and featured callout banners.
- Both dark-grid (`bg-grid-dark`) and orange-grid (`bg-grid-orange`) variants are supported.

### B. Builder Mosaics (Stepped Blocks)
- Clustered or stepped square blocks (e.g. 2x2, 3x1, L-shaped) of `#FF9900` and `#161F2E`.
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
   - `Primary / Glow`: Background `#FF9900` text `#0A0E17`, bold font, crisp border or subtle warm shadow.
   - `Technical / Outline`: Transparent background, 1px border `rgba(255, 153, 0, 0.4)`, hover border `#FF9900`.
   - `Secondary / Dark`: Background `#161F2E`, text white, 1px border `slate-800`.
2. **Cards**:
   - Background `#161F2E` with 70% opacity and backdrop blur.
   - 1px border `rgba(255, 153, 0, 0.15)`, transitioning to `0.4` on hover with a subtle lift.
3. **Badges**:
   - Square or subtly rounded (`rounded-sm` or `rounded-md`), monospace uppercase text, 1px technical border.

---

## 6. Creative Flexibility for Agents

Agents and developers have creative freedom to:
- Compose custom grid layouts and mosaic arrangements for new features and hackathons.
- Add subtle terminal-style interactions (blinking carets, typewriter effects, matrix-style data streams).
- Create event-specific illustrations and banner graphics using the square-grid coordinate system.
- Build interactive tabs, data visualization widgets, and cloud architecture calculators following these token rules.
