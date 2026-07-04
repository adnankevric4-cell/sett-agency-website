# Sett Agency Website

Context file for Claude Code. Read this every session before making changes. These are brand rules, not suggestions. When unsure, choose the most restrained, cleanest option.

## Project
- Custom website for Sett Agency, a boutique creative agency (branding, web, content, digital marketing).
- Founders: Adnan Kevrić and Varvara.
- Goal: a clean, premium, typographic site. Mostly white space and type. The brand appears rarely, by intent.
- Style reference for feel: afternow.co (clean, minimal, white, dark footer, results-led case studies). Reference for feel only, not for copying their enterprise tone.

## Positioning
- Premium and boutique. Never generic, never corporate, never salesy.
- Current portfolio focus is the UK education sector, but core site copy is NOT sector-limited. Education shows through the work and case studies, never baked into headlines or taglines.

## Tech Stack
- Astro (static site).
- GSAP (animations), Lenis (smooth scroll). Already installed.
- Manrope self-hosted via @fontsource/manrope (same Manrope the brand specifies via Google Fonts, self-hosted for performance).
- Deploy: Vercel via GitHub.

## Architecture
- Home
- Work (project grid)
- Individual case study pages (one per project)
- About
- Services
- Contact

## Colour Palette
Black and white system. Purple is defined but NOT active in phase one.

- #FFFFFF Pure White: cards, modals, elevated surfaces only.
- #F7F6F2 Off-White: primary page background (default).
- #F0EFEB Light Grey: hover states, section backgrounds, tag backgrounds.
- #E5E4E0 Border Grey: the only divider/border colour.
- #BBBBBB Mid Grey: disabled states, placeholder text.
- #888888 Secondary Text: meta info, labels, captions.
- #555555 Body Text: paragraph text on light backgrounds.
- #333333 Dark Text: subheadings, important body text.
- #1A1A1A Near Black: dark section backgrounds.
- #111111 Primary Black: headings, logo, primary text.
- #3D22A8 Primary Purple: RESERVED for future use. Do not use yet.

Rules:
- Off-white is the default background. Pure white only for elevated surfaces.
- Never use pure black #000000. Primary black is #111111.
- Border grey #E5E4E0 is the only divider colour. Never black borders.
- Never introduce colours outside this system.

## Typography
One typeface only: Manrope. Hierarchy through weight and size, never extra fonts.

Weights: 700 Bold (display, emphasis), 600 SemiBold (H1, H2, nav, CTAs), 500 Medium (H3, labels, uppercase tags), 400 Regular (H4, general UI), 300 Light (body, captions, long-form).

Web type scale:
- Display 56px / 700 / line-height 1.0
- H1 40px / 600 / 1.05 — standard heading, used across all pages except the hero
- H2 28px / 600 / 1.15
- H3 20px / 500 / 1.3
- H4 16px / 500 / 1.4
- Body 16px / 300 / 1.75
- Caption 14px / 300 / 1.6
- Label / Tag 11px / 500 / uppercase

Hero expressive headline (hero section only, maximum once per page):
- Size: clamp(2.75rem, 7vw, 8rem)
- Weight: 400
- Line-height: 1.05
- Letter-spacing: -0.02em
- Colour: #111111
This overrides H1 exclusively in the hero context. Never apply this treatment outside the hero.

Expressive type (large, full-width, unexpected line breaks) is allowed a MAXIMUM of 1 to 2 times per page. The rest must be disciplined. The effect works because of contrast.

## Logo System
Files in src/assets/brand/:
- sett-wordmark.svg: primary logo. Use in nav, documents.
- sett-symbol.svg: two squares diagonal, touching at corner. Standalone mark for favicons, social, signature moments.
- sett-logo-full.svg: wordmark + AGENCY. Cover pages, first-impression contexts (e.g. footer).
- sett-square.svg: single square (atomic motif unit).

Colour variants:
- On off-white: black logo.
- On dark (#111111 / #1A1A1A): off-white (#F7F6F2) logo.

Minimum size (web): wordmark 120px wide, symbol 24px wide.

Never: recolour outside variants, add shadows/outlines/glows, distort proportions, rotate, place on low-contrast backgrounds, or place anything inside the logo clear space (clear space = height of lowercase 's').

## Graphic Language: The Square
The square is the ONLY graphic element. It is not decoration. Every instance must have a compositional or communicative purpose. When in doubt, leave it out. Cleanliness wins.

Two roles, kept separate:
- Single square (sett-square.svg): occasional compositional accent. Used by judgement, sparingly. It is NOT an inline bullet and not a default list marker. A single square never stands alone without another element alongside it.
- Two-square symbol (sett-symbol.svg): the branded mark. Reserved for signature moments only: intro animation, page transitions, 404, loading. Never a casual decorative element on content pages.

Placement rules for graphic squares:
- Squares sit at the EDGES or CORNERS of a format. Never centred, never over text.
- Negative space is active and considered.
- Squares may be rectangles but must keep a square character. Avoid extreme aspect ratios.
- Colour follows the palette. Light bg: black. Dark bg: off-white.

Never: rotated squares (no 45 degrees, no angle), rounded corners, pixel art, checkerboard or repeating grid patterns, shadows/glows/effects, squares without purpose.

Note: the logo SYMBOL used as a mark (intro, transitions, favicon) may be centred because it is the logo, not a graphic-language square. The edges/corners rule applies to decorative square usage on layouts, not to the logo mark.

## Intro Animation (build LAST, low priority)
- Abstract opening using ONLY the symbol (two offset squares). No wordmark, no "Sett" reveal. It should read as an elegant geometric moment, not a logo splash.
- Symbol assembles into the offset position, holds briefly, dissolves into the site.
- Under ~1 second, plays once per session.
- No rotation. Direction (assemble vs draw) to decide later.

## Media Rules
- Images: always use Astro <Image /> component, never raw <img>. Source images in src/assets/ organised by client.
- Video: never committed to the repo. Embed from Vimeo or Mux.
- Background video loops: mp4 + webm, muted autoplay, with a poster image.
- Logos and the square motif: SVG only, never JPG/PNG. Inline the symbol when it needs to animate.

## Tone of Voice
Write like someone who knows what they are doing and does not need to prove it.

Four principles:
1. Direct, not cold. Warm and precise. Not corporate, not casual.
2. Short, not sparse. Short sentences, no filler, but with rhythm.
3. Confident, not arrogant. The work proves quality, not the copy.
4. Concrete, not abstract. Talk outcomes, not process.

Voice by context:
- Website: stripped back. Every word justified. No decoration.
- Case Studies: factual and confident. Let results speak. Numbers over adjectives.

## Copy Rules (hard)
- Never use em dashes. Use full stops, commas, or restructure.
- Never use these words/phrases: passionate about, we strive to, holistic approach, tailor-made solutions, full-service, leverage, synergy, empower, seamless, best-in-class, deep dive, game-changer, robust, exciting journey.
- No AI-sounding or generic-agency language.
- Sentence case for UI and headings unless a tag/label is explicitly uppercase (11px labels).

## Core Messaging
- Tagline: Setting up brands that value their business.
- One line: Setting up brands that value their business. Branding, web, content and digital marketing. Built around how you actually grow.
- Use the tagline on hero, bios, covers. Do not invent new taglines.

## Case Study Format
Each case study has: meta info, credits, and four narrative paragraphs in this order: challenge, process, solution, results. Lead with results where real numbers exist.

## Projects (current)
- Stirling Education: branding and web
- Redshift Education: web and digital communication
- Long Close School: web and digital communication
- Polam School: branding and web
- Castle College: branding and web
