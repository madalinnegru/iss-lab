# Design System Document: The Serene Guardian

## 1. Overview & Creative North Star: "The Mindful Clinical"
This design system moves away from the cold, sterile aesthetic of traditional medical software. Our Creative North Star is **"The Mindful Clinical."** We aim to marry the rigorous precision of healthcare with the soft, empathetic touch of a wellness sanctuary. 

To achieve this, we break from the "standard" boxy UI. We prioritize **intentional asymmetry**, where content isn't always perfectly centered but flows with a natural, editorial rhythm. We utilize **tonal layering** instead of harsh lines to create a sense of calm and safety. The interface should feel less like a "database of pills" and more like a "breath of fresh air."

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
Our palette is rooted in medical trust (Blues) and biological vitality (Greens), but executed with sophisticated depth.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content. Traditional borders create visual noise and "grid-locking." Instead:
- Define boundaries through **background color shifts**. Use `surface-container-low` for secondary sections sitting on a `surface` background.
- Use **vertical negative space** (Spacing Scale 8 or 10) to separate thoughts.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers, like stacked sheets of fine paper. 
- **Base Layer:** `surface` (#faf8ff)
- **Primary Content Blocks:** `surface-container-low` (#f3f3fc)
- **Interactive High-Priority Cards:** `surface-container-lowest` (#ffffff) for maximum "pop" and perceived elevation.

### The "Glass & Gradient" Rule
To elevate the app from "utility" to "premium," use **Glassmorphism** for floating elements (like bottom navigation bars or modal headers). Use `surface` at 80% opacity with a `20px` backdrop-blur.
- **Signature Textures:** For main Call-to-Actions (CTAs) or medication streaks, use a subtle linear gradient: `primary` (#0040a8) to `primary-container` (#2b59c3) at a 135-degree angle.

---

## 3. Typography: Editorial Authority
We utilize a dual-font strategy to balance character with extreme readability.

- **Display & Headlines (Manrope):** A modern, geometric sans-serif with a high x-height. It feels authoritative yet approachable. 
    - *Usage:* `display-lg` should be used for daily medication "wins" or big-picture health stats. Use `headline-sm` for section headers to provide a clear, bold entry point for the eye.
- **Body & Labels (Inter):** The gold standard for screen readability. 
    - *Usage:* `body-lg` is your default for medication instructions. `label-md` is reserved for technical data (dosage amounts, times).
- **Hierarchy Logic:** By pairing a wide, expressive headline (`Manrope`) with a neutral, functional body (`Inter`), we create an editorial feel that guides the user’s eye without causing "text fatigue."

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often too "heavy" for a healthcare context. We achieve depth through light and tone.

- **The Layering Principle:** Instead of shadows, nest `surface-container-highest` within `surface-container-low` to indicate a "pressed" or "embedded" interactive area.
- **Ambient Shadows:** When an element must float (e.g., a "Add Medication" FAB), use a "Whisper Shadow":
    - `X: 0, Y: 8, Blur: 24, Color: on-surface (1a1b22) at 4% opacity`. 
    - This mimics soft, natural laboratory lighting rather than a harsh digital glow.
- **The "Ghost Border" Fallback:** If a container sits on a background of similar value, use `outline-variant` (#c3c6d5) at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Soft Precision

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`), `full` roundedness. No shadow.
- **Secondary:** `secondary-container` (#a5f2d3) background with `on-secondary-container` (#217158) text. This provides a calming, "natural" alternative for non-critical actions.
- **Tertiary:** Pure text using `primary` (#0040a8) with `title-sm` typography.

### Cards & Medication Lists
- **The Rule:** No dividers. Use `surface-container-low` cards with `xl` (1.5rem) corner radius. 
- **Spacing:** Use Spacing `3` (1rem) for internal padding and Spacing `5` (1.7rem) for gutter between cards.
- **Visual Indicator:** Use a vertical pill-shaped accent of `secondary` (#196b52) on the left edge of a card to indicate "Taken" status, rather than a heavy green background.

### Input Fields
- **Styling:** Use `surface-container-highest` as the field background. No bottom line.
- **States:** When focused, use a 2px `surface-tint` (#2958c2) "Ghost Border" (20% opacity) and a subtle `surface-container-lowest` lift.

### New Component: The "Dose Timeline"
A specialized component for medication tracking. Use a thick `3.5rem` vertical track using `surface-container-high`. Active doses are represented by `full` rounded circles using the `tertiary` (#004c76) palette to distinguish from primary navigation.

---

## 6. Do’s and Don’ts

### Do
- **DO** use generous whitespace (Spacing `8` and above) to reduce cognitive load for elderly users.
- **DO** use `secondary` (Green) tones for "Success" states and `primary` (Blue) for "Routine" states.
- **DO** use "Glassmorphism" for the top status bar to allow the calm background colors to bleed through.

### Don't
- **DON'T** use `error` (#ba1a1a) for missed doses; it creates unnecessary anxiety. Use `outline` (#747684) to indicate a "Neutral/Missed" state, reserving Red only for critical health alerts.
- **DON'T** use `none` or `sm` roundedness. All interactive elements must have at least `md` (0.75rem) roundedness to maintain the "Soft" brand promise.
- **DON'T** use 100% black text. Always use `on-surface` (#1a1b22) to keep the contrast high but the "vibration" low.