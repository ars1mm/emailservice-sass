---
description: Frontend UI Consistency and Layout Guidelines
---

# Frontend Layout Consistency

These are the structural and mathematical consistency rules to use when building the frontend for the EMAILSHARE application. Always adhere to these principles for professional and responsive designs.

## Breakpoints

Design should predictably flow and restructure based on these screen width thresholds. Be consistent across Chakra UI `base`, `md`, `lg`, and `xl` properties.

- **Mobile:** 0–767px (Chakra: `base` to `sm`)
- **Tablet:** 768–1023px (Chakra: `md`)
- **Laptop:** 1024–1279px (Chakra: `lg`)
- **Desktop:** 1280px+ (Chakra: `xl`, `2xl`)

## Spacing and Sizing (8pt Grid System)

Most professional UIs use multiples of `8` for all spacing, sizing, paddings, margins, and icon sizes. This keeps everything mathematically aligned and visually consistent without overthinking it.

**The Spacing Scale:**
- `8px` (`0.5rem`, Chakra: `2`)
- `16px` (`1rem`, Chakra: `4`)
- `24px` (`1.5rem`, Chakra: `6`)
- `32px` (`2rem`, Chakra: `8`)
- `40px` (`2.5rem`, Chakra: `10`)
- `48px` (`3rem`, Chakra: `12`)
- `64px` (`4rem`, Chakra: `16`)

*Note: Chakra UI's spacing scale natively uses `4px` increments (`1` = `0.25rem` = `4px`). Therefore, using even-number values like `2`, `4`, `6`, `8` directly corresponds to the 8pt grid scale.*

## Typography Scaling

Use fluid typography formulas for headers and scalable text so it flows perfectly between screen sizes. 

**Formula:** `clamp(min, preferred, max)`

- **Example Implementation:** `clamp(16px, 2.5vw, 24px)`
- Ensures text is never too small on mobile, but grows dynamically on larger resolutions without needing explicit media queries on every font variation.

## Fluid Grids 

Instead of dealing with fixed pixels that overflow or break on weird resizes, use percentages to control child elements inside dynamic containers.

**The Formula:** `target ÷ context × 100 = %`

- **Example:** If your container is `1200px` and you want a column to be `400px` wide: 
  `400 ÷ 1200 × 100 = 33.33%`
- Apply this logic particularly when distributing items horizontally in standard Flex or Grid layouts without intrinsic equal-spacing components.
