# VBTI — Dev Team Handoff

**Version:** V34 (build sha `4dc63a2`, 2026-08-20)
**Repo:** https://github.com/RevHuang/vbti-hk
**Live prototype:** https://revhuang.github.io/vbti-hk/ (GitHub Pages, `main` branch, `.nojekyll` enabled)
**Owner:** Tayson (marketing) · **Contact for build:** Rev/Frankie

VBTI = **VinoBuzz Taste Identity**. Entertainment-first taste discovery quiz that outputs a Nora-ready recommendation vector. Nine drinker archetypes, Cantonese-first, mobile-first, static site (no build step, no runtime dependencies).

---

## 1. What to build

VBTI ships as a self-contained static bundle today. Production integration has two jobs:

1. **Embed or link the quiz** from vinobuzz.ai (subpath `/vbti/` or subdomain `vbti.vinobuzz.ai`).
2. **Persist the numeric taste vector** to the authenticated user profile and **hand it to Nora** as the first-recommendation seed.

The quiz UI, scoring math, archetype logic, and share cards are done. Dev work is **integration**, not re-implementation.

---

## 2. File map (`deliverables/vbti-hk-live/`)

| File | Purpose | Size |
|---|---|---|
| `index.html` | Entry point. Landing → 14-question flow → result → share. Mobile-first, viewport-optimised. | 17 KB |
| `app.js` | Single-file JS: questions, scoring, archetype matcher, grape matcher, share/Story renderer, match matrix, analytics hooks. **Single source of truth for content and math.** | 84 KB |
| `styles-app.css` | Primary V34 mobile app stylesheet. | 44 KB |
| `styles.css` | Base layout / typography. | 25 KB |
| `styles-brand.css` | VinoBuzz brand tokens (colour, type, spacing). | 33 KB |
| `styles-match.css` | Result page, orbit squad, Story card. | 48 KB |
| `styles-artistic.css` | Legacy artistic theme layer (kept for reference; not required for launch). | 16 KB |
| `README.md` | Cantonese overview, feature list, integration notes. |  |
| `VBTI-FRAMEWORK.md` | Content + scoring reference: dimensions, archetypes, match matrix, motion system, persistence schema. **Read this before touching scoring.** |  |
| `THIRD_PARTY_NOTICES.md` | Attribution (Tabler icons). |  |
| `.nojekyll` | Required for GitHub Pages to serve `_`-prefixed paths as-is. |  |
| `assets/vinobuzz-logo.svg` / `.png` | Brand mark. |  |
| `assets/tabler-answer-icons.svg` | SVG sprite used for the 14 question answer icons (monochrome line). | 18 KB |
| `assets/vbti-characters-female-hd-2x.png` | 4×2 sprite sheet — female cast at 2× retina. | 4.7 MB |
| `assets/vbti-characters-male-hd-2x.png` | 4×2 sprite sheet — male cast at 2× retina. | 5.2 MB |
| `assets/portraits/*.png` | 26 individual character portraits at **1752×1796 px** per version (HOST/SNAP/SEEK/CELL/COZY/DEAL/GIFT/VIBE/LAY × male/female + v18/v19/v20 revisions). Result page uses these, not the sprite sheet, to avoid retina softening. | ~2 MB each |
| `assets/social/{facebook,instagram,wechat,whatsapp}.svg` | Share icons. |  |

**All images are already at HD retina resolution.** No down-sampling required. Do not re-compress; the sheets have been colour-managed for the VinoBuzz orange (`#F2750A`).

---

## 3. Brand tokens (locked)

| Token | Value |
|---|---|
| Brand orange | `#F2750A` (V20+ correction; the older `#E96B14` still appears in some legacy copy — normalize to `#F2750A`) |
| Ink black | `#1F1F1F` |
| Body / warm white | `#FFFFFF`, cream `#FFF8EF` |
| Type | System sans (SF Pro / Noto Sans HK). No web font dependency. |
| Motion | Integer-pixel translations only for the result hero. No CSS scale/rotate/tilt/brightness on portraits (softens on retina). Respect `prefers-reduced-motion`. |

Do not introduce competing colours (no blue, no gradient rainbows). If a UI state needs a second colour, use ink on warm-white or reversed.

---

## 4. Content model

### 4.1 The 14 questions (see `app.js` → `QUESTIONS`)

Each answer emits an observation `{dim: number}` into up to ~15 dimensions. Dimensions:

**Sensory (weighted higher in matching):**
`body`, `freshness`, `tannin`, `sweetness`, `aroma`, `discovery`

**Behavioural (weighted lower):**
`social`, `control`, `value`, `care`

**Aroma-wheel families (secondary refinement):**
`citrus`, `tree_fruit`, `stone_fruit`, `tropical`, `red_fruit`, `black_fruit`, `floral`, `herbal`, `spice`, `oak`, `earth`

**Behavioural routing:** Q1 (Friday chat) and Q14 (mid-session behaviour) can route directly to VIBE / LAY types when clear, before Euclidean distance runs.

**Budget anchor:** Q13 (first-date dinner) maps to HK$300 / 500 / 800 / 1500. **Never surface as a result field.** Inject into the Nora prompt only, without the parenthetical range.

### 4.2 Nine archetypes

`HOST 飯局主理人 · SNAP 手機飲先 · SEEK 冷門酒探員 · CELL 酒單學霸 · COZY Chill住飲 · DEAL 抵飲獵人 · GIFT 送禮神隊友 · VIBE 氣氛酒鬼 · LAY 躺卡` (9th type added in V18; behavioural route from Q14).

Baseline population priors sum to 100% (VIBE 24, DEAL 18, SNAP 17, COZY 15, GIFT 10, SEEK 8, HOST 5, CELL 3, LAY ~+adjustment). **Treat as campaign baseline, not a survey finding.** Recalibrate after 500–1,000 qualified completions.

### 4.3 Match matrix

45 unordered pairings (9 types incl. same-type pairs), all in `app.js` → `MATCH_MATRIX`. Symmetric scores 0–100. Named team bonuses exist for positive/neutral pairs (e.g. HOST+VIBE = 全枱起身 Cheers 權). Clash pairs display score + mismatch reason **only** (no forced bonus copy).

Friend flow: sharer's result creates `?friend=VIBE` link → friend completes → result page reveals both types + match% + bonus.

---

## 5. Scoring pipeline (in `app.js`)

```
answers[]  →  dim_scores{}  →  archetype_distance{}  →  headline_type
                                    ↓
                          grape_rank(scores, aroma_wheel, type_prior)  →  top-3 grape lanes
                                    ↓
                          nora_prompt(type, scores, budget_anchor)     →  suggested first message
                                    ↓
                          story_card_1080x1920(type, gender, matches)  →  shareable PNG (canvas render)
```

- Weighted Euclidean distance on sensory > behavioural.
- Grape ranking pool (VinoBuzz in-stock verified 2026-08-17): Pinot Noir, Pinot Gris / Pinot Grigio, Chardonnay, Sauvignon Blanc, Riesling, Cabernet Sauvignon, Merlot, Syrah / Shiraz, Gamay, Grenache, Moscato.
- **Production must re-verify grape SKU availability at click-through via the live VinoBuzz filter API** and suppress or swap lanes with zero stock.

---

## 6. Persistence schema (write to VinoBuzz profile on account creation)

Save the **vector**, not just the type. The type is campaign language; the vector is the recommendation seed.

```json
{
  "vbti_type": "VIBE",
  "body": 52,
  "freshness": 58,
  "tannin": 38,
  "sweetness": 42,
  "aroma": 52,
  "discovery": 52,
  "social": 98,
  "control": 12,
  "value": 48,
  "care": 22,
  "aroma_wheel": {
    "citrus": 62, "tree_fruit": 40, "stone_fruit": 35, "tropical": 55,
    "red_fruit": 48, "black_fruit": 30, "floral": 50, "herbal": 25,
    "spice": 30, "oak": 20, "earth": 15
  },
  "budget_anchor_hkd": 500,
  "budget_range_hkd": [400, 600],
  "gender_variant": "female",
  "version": "vbti-1.0",
  "completed_at": "2026-08-20T02:06:00Z"
}
```

**Nora integration:** on first successful decision after quiz completion, mark the campaign conversion event (`vbti_saved` + `nora_first_decision`). That combined event is the true KPI — completion alone is not.

---

## 7. Analytics events (implement or forward to GA4 / PostHog)

Currently `app.js` has a `track(event, props)` stub. Replace with GA4 + PostHog. Send at minimum:

| Event | Trigger | Key props |
|---|---|---|
| `vbti_start` | Landing "Start" tap | source, friend_code |
| `vbti_question_answer` | Every answer | q_index, choice_id, dims_updated |
| `vbti_complete` | Result revealed | type, scores, budget_anchor |
| `vbti_gender_switch` | Result page gender toggle | from, to |
| `vbti_squad_character_select` | Orbit squad character tap | current_type, selected_type, relation, score |
| `vbti_share_native` / `vbti_share_copy` | Share fired | type, target |
| `vbti_story_download` | 1080×1920 PNG downloaded | type |
| `vbti_friend_invite_click` | Friend-quiz link clicked | inviter_type |
| `vbti_friend_complete` | Friend result rendered | inviter_type, friend_type, score |
| `vbti_nora_cta_click` | Nora CTA tap on result | type, prompt_length |

The useful loop is **result → invite → friend completion**, not just card copies. Segment funnels around that.

---

## 8. Nora hand-off (production)

- On result reveal, generate the Nora suggested prompt (already built in `app.js` → `noraPrompt(scores, budget_anchor)`).
- Signed-in users: pass `?vbti=<vector>` to the Nora entry deep link (or POST directly to session init).
- Signed-out users: prompt to save the VBTI, create account, then open Nora with prefilled vector.
- Nora must use the **vector**, not the type label, for recommendation ranking. The type label is only for share hooks and campaign copy.

---

## 9. Launch checklist for dev team

- [ ] Fork/clone https://github.com/RevHuang/vbti-hk
- [ ] Verify locally: `python3 -m http.server 8080` → `http://localhost:8080`
- [ ] Test mobile Safari + Chrome (iPhone 14+, Android 12+): 14-question flow, gender toggle, Story card export, friend link
- [ ] Replace `track()` stub with production GA4 + PostHog (see §7)
- [ ] Wire `vbti_saved` → VinoBuzz user profile write (see §6)
- [ ] Wire Nora deep link with vector (see §8)
- [ ] Live-verify grape SKU availability at recommendation render (§5)
- [ ] Set final domain: `vinobuzz.ai/vbti/` or `vbti.vinobuzz.ai`
- [ ] Add Open Graph card (1200×630) for share previews
- [ ] Confirm `.nojekyll` present on prod host if static-served
- [ ] Load-test the Story card renderer (canvas 1080×1920) on low-end Android
- [ ] Add server-side rate limit for friend-code endpoint
- [ ] Legal footer copy: "VBTI is entertainment-first taste discovery, not clinical/scientific personality assessment. Not affiliated with MBTI®."

---

## 10. Known caveats / non-goals

- **Not** a clinical personality test. Never use MBTI® language in copy or docs.
- Population priors are **campaign baselines**, not HK demographic data. Recalibrate after N ≥ 500 real completions.
- Match matrix scores are **entertainment logic**, not relationship science.
- The static grape pool is a build-time snapshot; production must call the live inventory API.
- The V15/V18/V19/V20 portrait suffixes reflect character-art revisions; use the highest suffix per (type, gender) that exists in `assets/portraits/`.

---

## 11. Contact + iteration

- Marketing / content changes: Tayson
- Platform / API / auth integration: Rev / Frankie
- Character art / new portraits: Tayson to brief, we regenerate at 1752×1796
- Any change to scoring math or archetype prototypes: coordinate with Tayson first — the `vbti-1.0` vector is stored per user and is the seed for Nora's recommendations.
