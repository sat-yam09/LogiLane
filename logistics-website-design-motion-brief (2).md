# [Company Name] — Website Design & Motion Engineering Brief

## 1. Project Positioning

This is a flagship, enterprise-grade logistics/freight company website — the digital equivalent of an automotive flagship product page (Rivian, Volvo Trucks, Porsche) rather than a generic freight/trucking template. Every visual and motion decision must read as engineered and intentional, never as a stock template or default AI-generated aesthetic.

**Hard rules — no AI slop:**
- No default/rainbow gradients used as flat backgrounds
- No bounce/elastic easing anywhere
- No stock isometric truck illustrations or generic freight iconography
- No generic Bootstrap-style card grids or templated hero layouts
- No decorative animation that isn't earning its place — restraint over spectacle

---

## 2. Visual System

### Color Palette
| Role | Value | Notes |
|---|---|---|
| Background (primary) | `#0A0A0C` | near-black base |
| Background (panel) | `#111114` | secondary surface |
| Accent (red, bright edge) | `#B3122E` | crimson |
| Accent (red, deep edge) | `#8B0000` | oxblood |
| Text (primary) | `#F2EFEA` | warm off-white |
| Metal accent | `#8A8D93` | brushed steel, for chrome/dividers |

Rule: red never appears as a flat fill background — only as a radial glow, an accent line, a hover state, or the section-divider motif. Always desaturated toward black at the gradient's edge, never a bright/neon red.

### Typography
- **Display**: a grotesk with weight and character (Neue Montreal / ABC Diatype / Founders Grotesk) — oversized, tight tracking for headlines
- **Mono/labels**: IBM Plex Mono or JetBrains Mono — for nav numbers, stats, technical readouts (echoes a cargo manifest feel)
- **Body**: same grotesk family, regular weight, line-height 1.5–1.6

### The Signature Gradient (Section Divider System)
- Base shape: radial vignette — bright center fading through the crimson accent into near-black at the edges (light → color → dark)
- Usage:
  1. Behind the hero's 3D truck, acting as a spotlight/engine-glow
  2. At every major section seam, as a soft "chapter break" instead of a hard divider line
  3. As ambient glow behind key stats, quotes, or CTAs
- Never full-bleed or used as a wash — always contained, always paired with generous dark negative space

---

## 3. Hero Section Spec
- Full-viewport, dark canvas
- High-poly 3D truck model (GLB/GLTF), centered, rendered via `react-three-fiber` + `drei` (or Spline if faster to embed)
- Entrance animation: truck drives/settles into frame on load → cab lights power on → subtle idle suspension bounce loop once settled
- Cursor-parallax: truck rotates a few degrees toward cursor position, capped range (no free rotation)
- Headline: oversized kinetic text, word-by-word or line-by-line reveal on load, staggered
- CTA: thin-border button, magnetic hover pull, hard-edge fill-wipe on hover
- Signature gradient glow sits behind the truck as the spotlight source

---

## 4. Multipage Architecture & Transitions
- Persistent header/nav across all routes — only the content area transitions, so it feels like one continuous app
- Route transition sequence:
  1. Current content fades + lifts (~200ms)
  2. Signature red-glow wipes across the viewport
  3. New content fades in from behind the glow
- Lenis: `stop()` before transition → reset scroll to top → `start()` + re-init ScrollTrigger once new content mounts
- First-load preloader only: logo line-draw or thin progress bar while hero video/3D assets preload, dismissed via the same red-glow wipe

---

## 5. Interaction & Hover System

### Text & Links
- Underline draws in from left on hover (`stroke-dashoffset` or `scaleX`), color shifts off-white → crimson
- "View more" style links: arrow slides in alongside the underline draw

### Buttons
- Magnetic cursor pull within a small capped radius
- Hard-edge fill wipe on hover (never a gradient swipe)
- Outline buttons: SVG stroke draws in on hover
- Icon buttons: slight slide/rotate + 1.03–1.05x scale max, no overshoot

### Cards & Images
- Scale 1.04–1.06x on hover inside a masked/overflow-hidden frame
- Signature red glow fades in behind the card on hover
- Subtle perspective tilt toward cursor, capped ~5–8°
- Scroll-in reveal via clip-path wipe, not a plain opacity fade

### Cursor
- Custom cursor: dot + lagging trail ring (lerp-based easing)
- Morphs into a contextual label ("View", "Drag") over interactive zones
- Expands into a soft red-glow blob near buttons

---

## 6. Scroll-Triggered Motion
- Text blocks: staggered fade + 20px slide-up, line-by-line
- Stat counters: count up on viewport entry, brief pin
- Services section: pinned vertical scroll drives a horizontal card scroll (GSAP ScrollTrigger)
- Process/timeline section: sticky vertical line fills as milestones reveal sequentially

---

## 7. Motion Conventions
- Custom easing throughout — no default linear/ease-in-out; use a mechanical curve such as `cubic-bezier(0.65, 0, 0.35, 1)`
- Timing: micro-interactions 150–300ms · section reveals 600–900ms · page transitions 700–1000ms
- No bounce, no elastic overshoot — every motion should read as weighted and deliberate, matching an industrial/engineering brand tone

---

## 8. Required Skills & Tech Stack
- **GSAP + ScrollTrigger** — scroll-driven animation, pinning, horizontal scroll sections
- **Lenis** — smooth-scroll layer, synced with ScrollTrigger
- **react-three-fiber + drei** (or Spline) — 3D truck model rendering and interaction
- **WebGL/GLSL shaders** — for a live-rendered glow/vignette rather than a static gradient asset, adding subtle motion/depth to the divider
- **Video encoding (H.264, all-keyframe)** — for any scroll-scrubbed footage sections
- **GSAP or Framer Motion** — for route-level page transition sequencing
- **Design/motion direction discipline** — restraint in timing and scale is what separates this from generic template output; every animation should be justifiable, not decorative

---

## 9. 3D Asset Generation — Spline Prompts

### Recommended direction
- **Truck**: modern heavy-duty cab-over semi-tractor (Freightliner Cascadia / Volvo VNL-style proportions) — clean aerodynamic panels, not a cartoon or toy-proportioned truck. Matte charcoal-black body, brushed steel trim, one thin crimson accent line as the only color pop.
- **Environment**: a minimal cinematic freight yard at dusk — not a busy, cluttered depot. Just enough context (containers, yard lights, a soft warehouse silhouette) to ground the truck without competing with it.
- **Practical note**: Spline's AI text-to-3D is strongest for a single hero object, but text-to-3D tools generally struggle to nail precise vehicle geometry (wheel wells, grille detail, proportions). Two solid paths:
  1. Use the truck prompt below as a Spline AI starting mesh, then manually clean up proportions in the editor
  2. Or source a pre-built high-poly semi-truck GLB (Sketchfab/TurboSquid), import it into Spline, and build the yard environment natively around it using primitives — this generally gives a more "flagship" result than full AI-gen

### Prompt — Truck model (Spline AI)
"A highly detailed, photorealistic modern heavy-duty semi-truck cab-over tractor unit. Matte dark charcoal-black body paint with brushed steel chrome accents on the grille, exhaust stacks, and mirrors. A single thin deep crimson red accent line along the cab and undercarriage lighting. Aerodynamic fairings, clean industrial design language. LED headlights with a warm white glow. Studio-quality automotive rendering, physically-based materials, sharp reflections, realistic tire and rim detail. Three-quarter front view, low-angle hero composition. No cartoon proportions, no toy-like styling."

### Prompt — Yard environment (Spline AI / manual build)
"A minimal cinematic logistics freight yard at dusk. Dark asphalt ground with a subtle wet reflective sheen. Two to three stacked shipping containers in the mid-background, slightly out of focus. Tall overhead LED yard lights casting cone-shaped light beams through light atmospheric fog. A soft, blurred warehouse silhouette in the far background. Muted charcoal and steel-grey palette with a single warm crimson rim-light source. Light volumetric haze for depth. Wide open negative space around the center — no clutter. Physically based lighting, moody industrial atmosphere."

### Combined single-scene prompt (if generating as one)
"A photorealistic heavy-duty semi-truck parked in a minimal cinematic freight yard at dusk. Matte charcoal-black truck body with brushed steel trim and a single crimson accent line. Dark wet-look asphalt ground, two to three softly blurred shipping containers in the background, tall yard lights casting cone beams through light fog, distant blurred warehouse silhouette. Muted charcoal/steel-grey environment palette, one warm crimson rim-light on the truck. Physically based materials and lighting, shallow depth of field, wide negative space, industrial and premium in mood — not busy or cluttered."

### Short-form prompts (for Spline's input limit)
Keyword-dense, not full sentences — trims adjectives while keeping subject, material, lighting, and mood intact.

**Truck:**
"Photorealistic heavy-duty cab-over semi-truck. Matte charcoal-black body, brushed steel trim, thin crimson accent line, LED headlights, aerodynamic panels, PBR materials, sharp reflections, three-quarter low-angle hero shot. No cartoon proportions."

**Yard:**
"Minimal freight yard, dusk. Wet dark asphalt, 2–3 blurred shipping containers, tall yard lights with cone beams through light fog, blurred warehouse silhouette, muted charcoal/steel palette, one warm crimson rim light, shallow depth of field, wide open space, industrial mood."

**Combined (single scene):**
"Photorealistic charcoal-black semi-truck, crimson accent line, parked in a minimal freight yard at dusk. Wet asphalt, blurred shipping containers, yard lights with cone beams, foggy warehouse silhouette, steel-grey palette, one crimson rim light, shallow depth of field, premium industrial mood."


- Set up at least two States: (1) truck off-frame or unlit "entrance" state, (2) settled "hero" state with lights on and a subtle idle suspension loop
- Link state transitions to scroll/hover events later via Spline's React runtime (`@splinetool/react-spline`) rather than building the interaction logic inside Spline itself
- Keep the environment geometry low-poly (boxes/planes for containers and ground, simple cone-light meshes for the yard lights) so the exported scene stays lightweight for web — save the polygon budget for the truck itself

---

## 10. Extra Motion Notes
*(Reserved space — add any additional motion/animation prompts or references here as they come up.)*

-
-
-
