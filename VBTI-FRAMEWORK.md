# VBTI Content and Scoring Framework

## Positioning

**VBTI = VinoBuzz Taste Identity.** It is entertainment-first taste discovery, not a clinical personality diagnosis and not an assessment of wine knowledge. The public campaign should not claim affiliation with or scientific equivalence to MBTI®.

The result has two jobs:

1. create a clear, relatable identity people want to share;
2. save structured signals Nora can use to make a better first recommendation.

The final conversion event should be **VBTI saved + one successful Nora decision**, not quiz completion alone.

## Professional wine logic

Six user-facing dimensions map directly to common sensory structure used in wine recommendation:

| Dimension | Low end | High end | Recommendation impact |
|---|---|---|---|
| Body | light | full | wine weight, alcohol, concentration and serving context |
| Freshness | soft | electric | perceived acidity and refreshment |
| Tannin | silky | grippy | astringency, structure and food-protein need |
| Sweetness | bone-dry | lush | residual-sugar tolerance and spicy-food compatibility |
| Aroma | savoury | perfumed | fruit/floral versus earthy/herbal preference |
| Discovery | classic | wildcard | familiar regions/styles versus unusual grapes and methods |

Five hidden behavioural signals shape the personality wrapper and decision context:

- social energy;
- decision control;
- value sensitivity;
- care/gifting anxiety.
- inferred comfortable bottle budget.

The questions use sensory analogues—tea strength, coffee bitterness, lemon freshness, dessert tolerance, food weight and aroma families—because users can answer them without wine vocabulary. This avoids rewarding expertise or asking users to describe flavours they do not yet know.

V15 adds an 11-family Wine Aroma Wheel layer: citrus, tree fruit, stone fruit, tropical fruit, red fruit, black fruit, floral, herbal/vegetal, spice, oak/toast and earthy/savoury. Question 2 and the direct aroma question provide complete baseline vectors; food, tea and wind-down choices reinforce the relevant families. This aroma vector refines grape ranking after structural fit, so aroma does not overpower acidity, body, tannin or sweetness.

Each answer adds 0–100 observations only to relevant dimensions. The score for a dimension is the mean of all observations that measured it. Result matching uses weighted Euclidean distance against eight type prototypes; the six sensory dimensions carry more weight than the four behavioural dimensions.

## The 14-question flow

1. Friday group-chat behaviour — social energy, control, discovery.
2. Favourite non-wine drink — sweetness, acidity, body, bitterness tolerance and a complete aroma-wheel baseline.
3. Dinner craving — body, freshness, tannin and aromatic preference.
4. Tea strength — tannin and texture.
5. Dessert behaviour — sweetness tolerance.
6. Preferred smells — aromatic direction.
7. Wine-list behaviour — control, discovery and value sensitivity.
8. Bubbles and sharp drinks — acidity/freshness.
9. Bring-a-bottle scenario — social confidence and gifting care.
10. Real restaurant wine-selection behaviour — food pairing, novelty, crowd safety or value priority.
11. Long-day drink — context, body and softness.
12. Mystery-wine trust test — discovery and control tie-breaker.
13. First-date dinner choice — softly infers a default bottle budget anchor: Japanese all-you-can-eat → HK$300; a homemade dinner at home → HK$500; steak dinner → HK$800; omakase → HK$1,500.
14. Mid-session drinking behaviour — identifies whether the user usually becomes emotional and needs to lie down early (LAY), becomes the late-night cheerleader (VIBE), stays steady, or self-regulates.

The dinner question is a behavioral pricing heuristic, not a statement of income or a hard spending limit. Use it quietly as Nora's default search band. Do not present it as a separate result, share-card field or personality judgment; include it only inside the suggested Nora prompt, where the user can still edit it. Recommended ranges are HK$250–350, HK$400–600, HK$700–900 and HK$1,200–1,500 respectively.

The full wording, light humour, answer choices and numerical vectors live in `app.js` so the prototype is the single source of truth.

## Nine drinker types

### HOST — 飯局主理人 / The Table Commander

- **Core:** social, decisive, structured, food-led.
- **Wine lane:** Cabernet Sauvignon, Merlot, Syrah / Shiraz.
- **Share hook:** “You are happiest when the table trusts you to choose.”
- **Nora implication:** one confident food match; dry, fuller and savoury with structure.

### SNAP — 手機飲先 / The Aesthetic Pourer

- **Core:** social, visual, aromatic and fresh.
- **Wine lane:** Pinot Gris / Pinot Grigio, Sauvignon Blanc, Chardonnay.
- **Share hook:** “Presentation is part of the experience—and you are fine admitting it.”
- **Nora implication:** polished, fragrant, bright and presentable.

### SEEK — 冷門酒探員 / The Wildcard Palate

- **Core:** highly exploratory, fresh and character-led.
- **Wine lane:** Gamay, Grenache, Riesling.
- **Share hook:** “A familiar bottle is comfortable; a new bottle is more interesting.”
- **Nora implication:** lesser-known grapes and savoury detail over famous labels.

### CELL — 酒單學霸 / The Classic Strategist

- **Core:** dry, full, tannic, controlled and tradition-led.
- **Wine lane:** Cabernet Sauvignon, Pinot Noir, Chardonnay.
- **Share hook:** “You know what you like—and consistency matters.”
- **Nora implication:** serious classics, recognised regions and low novelty risk.

### COZY — Chill住飲 / The Soft-Life Sipper

- **Core:** private, soft, fruit-led and comfort-oriented.
- **Wine lane:** Pinot Noir, Merlot, Riesling.
- **Share hook:** “Your ideal bottle is easy to enjoy and never tries too hard.”
- **Nora implication:** low tannin, generous fruit and no aggressive edges.

### DEAL — 抵飲獵人 / The Value Hunter

- **Core:** value-sensitive, controlled and socially practical.
- **Wine lane:** Shiraz, Cabernet Sauvignon, Pinot Grigio.
- **Share hook:** “A smart buy always tastes a little better.”
- **Nora implication:** optimise character-to-price, not simply lowest price.

### GIFT — 送禮神隊友 / The Gift Bottle Thinker

- **Core:** thoughtful, risk-aware and presentation-conscious.
- **Wine lane:** Chardonnay, Pinot Noir, Cabernet Sauvignon.
- **Share hook:** “You put more thought into the bottle than most people put into the card.”
- **Nora implication:** recognised quality, elegant presentation and broad appeal within budget.

### VIBE — 氣氛酒鬼 / The Vibe Drinker

- **Core:** highly social, low-control, flexible and occasion-led.
- **Wine lane:** Pinot Grigio, Sauvignon Blanc, Moscato.
- **Share hook:** “The bottle name is optional. Getting the whole table to cheers is not.”
- **Nora implication:** easy, versatile, crowd-friendly and ready to share.

## Population baseline

The eight archetype shares are a reasoned campaign baseline, not a Hong Kong population statistic. They intentionally sum to 100% and reflect a basic real-world assumption: casual/social/value-led drinkers substantially outnumber confident selectors and traditional wine enthusiasts.

V10 result UX adds a short Cantonese summary for every personality inside the selected squad card, so users understand the teammate before reading the match chemistry. Its 1080×1920 Story export uses a purpose-built recap layout—not a screenshot—with the result character, fun fact, population share, best-match character and score, team bonus and friend-test CTA arranged as separate visual blocks.

V11 separates the female/male selector from the portrait frame. The large result portrait must use a dedicated 1752×1796 per-character asset rather than enlarging a multi-character sprite. Main-card motion is limited to integer-pixel translation, with no scale, rotation, brightness filter or 3D card tilt, because those effects visibly soften the character on common mobile/retina displays.

| Type | Baseline | Why |
|---|---:|---|
| VIBE 氣氛酒鬼 | 24% | Social occasion is the most common reason to drink; product analysis is secondary. |
| DEAL 抵飲獵人 | 18% | Value confidence is a mainstream daily purchase concern. |
| SNAP 手機飲先 | 17% | Visual and social cues are highly accessible to casual urban drinkers. |
| COZY Chill住飲 | 15% | Relaxation and familiar easy-drinking styles form a large at-home segment. |
| GIFT 送禮神隊友 | 10% | Gifting is important but occasion-specific rather than everyday. |
| SEEK 冷門酒探員 | 8% | Active exploration of obscure grapes and regions remains a minority behaviour. |
| HOST 飯局主理人 | 5% | Few people confidently own the entire table's wine decision. |
| CELL 酒單學霸 | 3% | Vintage/region/producer-led traditional enthusiasts are the smallest specialist group. |

Re-estimate these shares after 500–1,000 qualified completions. Do not call them survey findings before that calibration.

The prototype uses behaviour-first rules before sensory-distance tie-breaking. The final behaviour question routes the clearest LAY and VIBE answers directly because alcohol tolerance and post-drinking behaviour cannot be inferred reliably from flavour preference alone. Launch population priors for the nine identities total 100%; they are product assumptions to be recalibrated after 500–1,000 valid results, not demographic evidence.

## Sharing design

- Result appears before signup.
- Primary asset is a 1080×1920 Instagram Story personality card.
- The Story card includes one personality fun fact, population share, best matching type and score, named team bonus, and a friend-quiz CTA carrying the sharer's type code.
- Where Web Share supports files, VBTI shares the rendered PNG together with the friend-match link. Other browsers download the PNG or copy the friend-match text.
- Every result has a four-letter code, one relatable insight and three suggested wine styles.
- Native Web Share is used where supported; clipboard fallback works elsewhere.
- Suggested CTA: **“Find your VBTI. Then let Nora choose one bottle that fits it.”**

## Friend matching and team bonus

Every result contains three social hooks:

1. two complementary personalities that make a strong drinking team;
2. one personality that is likely to clash over pace, budget, presentation or who makes the final decision;
3. a combination-specific team bonus: every possible pairing has its own name and practical drinking-situation ability.

The friend flow is deliberately lightweight. A completed result creates a link such as `?friend=VIBE`. The friend takes the same quiz, and the result page compares the inviter's stored type code with the friend's type code. No account or voting system is required for the prototype.

The match matrix covers all 45 unordered combinations across nine types, including same-type pairs. Scores are symmetric and are campaign entertainment logic—not relationship science. The score reflects practical drinking-team complementarity: decision ownership, social pace, willingness to explore, value sensitivity, presentation care and preference for quiet versus high-energy occasions. Pair-specific bonus copy exists for positive and neutral combinations, but the UI deliberately suppresses it for the designated lowest match (all launch clash scores are below 50%); those results show only the mismatch reason.

Named bonuses are reciprocal pair concepts:

- HOST + VIBE: **全枱起身 Cheers 權**
- SNAP + GIFT: **IG Story 自帶高級感**
- SEEK + DEAL: **冷門抵飲雷達**
- CELL + COZY: **陳年慢飲結界**

Track invite click, friend quiz start, friend completion, match reveal and bonus unlock separately. The useful campaign loop is result → invite friend → friend completion, not simply copying a result card.

### Interactive squad stage

The result page presents the current type at the centre of an orbit with three selectable characters: two strong teammates and one likely clash. Selecting a character updates the spotlight panel, animated score meter, practical reason and team-bonus reveal without navigating away. Track each selection as `vbti_squad_character_select` with current type, selected type, relation and score.

## Dynamic inventory-verified mainstream grapes

The result no longer assigns one fixed three-grape list to each personality. It scores 12 mainstream grape profiles against the user's complete structural/social answer vector plus the 11-family aroma-wheel vector, then applies a small personality prior and returns three distinct grape families. Structural fit remains primary; aroma-wheel distance acts as a professional refinement. This keeps the identity coherent while allowing users with the same headline type to receive different wine directions.

On 2026-08-17, the VinoBuzz in-stock SKU filter returned live candidates for every grape used in the UI: Pinot Noir, Pinot Gris, Pinot Grigio, Chardonnay, Sauvignon Blanc, Riesling, Cabernet Sauvignon, Merlot, Syrah, Shiraz, Gamay, Grenache and Moscato.

This is a build-time verification, not a guarantee that stock never changes. In production, the recommendation click-through should call the live VinoBuzz filter again and suppress or replace a grape lane if no commercial SKU is available.

## Character motion system

The active result character uses a type-specific CSS movement rather than one generic animation: HOST gestures decisively; SNAP shifts into a selfie pose; SEEK scans side-to-side; CELL pauses to inspect; COZY breathes and sips slowly; DEAL gives quick calculation nods; GIFT presents with a small bow; VIBE repeatedly lifts into a cheers motion. Match-card characters animate on hover, while the result character moves continuously at a restrained pace. `prefers-reduced-motion` disables all personality movement.

## Male and female character system

Every personality has a matching male and female illustration in the same 4×2 sprite-cell order: HOST, SNAP, SEEK, CELL / COZY, DEAL, GIFT, VIBE. The result-page switch changes the character sheet without changing the user's VBTI result or match score. The selected version propagates to the hero portrait, interactive squad, all-type strip and 1080×1920 Story export, and emits `vbti_character_gender_select`.

The visual comedy comes from behaviour, not caricature: HOST points while holding the wine list; SNAP is mid-selfie; SEEK carries a map and magnifying glass; CELL judges with notebook and glasses; COZY is sunk into an orange chair in slippers; DEAL holds calculator, receipt and price tag; GIFT presents a ribboned box; VIBE raises a glass with a portable speaker.

The inferred budget stays hidden from the standalone result and is used only in the Nora prompt. The prompt keeps the anchor (`HK$300`, `HK$500`, `HK$800` or `HK$1,500`) but no longer exposes the parenthetical range.

## Product persistence

After account creation, save the numeric taste vector—not only the type name. The type is campaign language; the vector is the useful recommendation input. Suggested profile object:

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
  "budget_anchor_hkd": 500,
  "budget_range_hkd": [400, 600],
  "version": "vbti-1.0"
}
```

## Launch validation

Before scaling paid media, test at least 100–200 people and check:

- completion rate ≥70%;
- no single type exceeds 30% of completed results without a clear audience explanation;
- result-to-save/signup ≥35%;
- signup-to-successful-Nora-task ≥50%;
- share intent/click ≥10%, target 20%;
- users report that the result is easy to understand, feels accurate, and the recommended wine styles feel plausible;
- D7 repeat ≥15% among activated profiles.

Recalibrate type prototypes using observed answer distributions; do not rewrite the humour merely to force equal type distribution.
