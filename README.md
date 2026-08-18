# VBTI 廣東話專業風味輪版 V15

為香港用戶製作嘅廣東話 VBTI campaign prototype，支援手機同桌面瀏覽器，毋須額外依賴。

## Run

Open `index.html` directly, or run a static server:

```bash
python3 -m http.server 8080
```

然後打開 `http://localhost:8080`。

## 包含內容

- 14 條手機優先互動問題
- 酒體、清爽度、單寧、甜度、香氣、探索度、社交傾向同決策方式評分
- 第 2 題改成「以下邊款飲品係你最鍾意？」；用日常飲品偏好校準甜度、酸度、濃度、苦味同香氣
- 加入葡萄酒風味輪模型：柑橘、青蘋果／梨、白桃／核果、熱帶水果、紅果、黑果、花香、草本、香料、木桶／烘烤、泥土／鹹香共 11 個風味族
- 現有問題分工收集完整資料：結構與香氣偏好、探索度、社交能量、決策控制、價值取向、送禮照顧度、場合、預算同飲後狀態；問題維持日常化，唔要求用戶識酒
- 9 種廣東話飲酒個性結果
- 新增「氣氛酒鬼」：枱面有乜飲乜，永遠第一個叫全枱 Cheers
- 9 種人格全面使用簡單自然香港廣東話，並加入合共 100% 嘅分布、稀有度同成因
- 每個結果會顯示兩個最佳飲酒拍檔、一個容易撞板嘅角色，以及實際配對分數
- 「叫朋友做配對」會產生 `?friend=TYPE` 專屬連結；朋友完成測驗後，即場顯示雙方 matching level
- 正面／中性配搭會顯示組合專屬「飲酒組隊加成」；最低配對／容易撞板角色只顯示分數同原因，唔會硬加一個正面能力
- 8 個結果角色各自有符合性格嘅動態：拍板、自拍、探索、聞香、慢飲、計數、送禮同舉杯等節奏
- 「啱你嘅酒款風格」會按 14 題答案嘅酒體、清爽度、單寧、甜度、探索度、社交、控制、抵飲、送禮取向，再加入 11 個風味輪分數動態配對 3 種葡萄；唔再係每個人格固定同一組結果
- 動態葡萄池使用 12 個 VinoBuzz 已核對有庫存、一般人容易認得嘅方向，包括 Pinot Noir、Pinot Gris／Pinot Grigio、Chardonnay、Sauvignon Blanc、Riesling、Cabernet Sauvignon、Merlot、Syrah／Shiraz、Gamay、Grenache 同 Moscato
- 「最佳飲酒小隊」改成可點擊軌道舞台：用戶可以逐個揀好拍檔／撞板角色，即時睇人物簡介、Match% 同原因；加成只會喺合適配搭出現
- 重新創作 18 個人物：9 種人格各有男女版本；新增「躺卡」高清角色、結果、配對同 Story 卡
- 結果頁可即時切換「女角色／男角色」；選擇會同步套用到主角、互動小隊、8 人角色列同 Instagram Story 卡
- 目前百分比係 campaign baseline，正式上線後要用首 500–1,000 份完成結果校準
- 用第一次約會晚餐選擇推算價格範圍；結果頁不獨立顯示，只加入 Nora 建議提示
- 動態口味指紋同 Nora 提示
- 全站改成暖白、淺杏色同 VinoBuzz 品牌橙 `#E96B14` 嘅 light theme，以少量啞黑 `#1A1A1A` 做文字重點；IG Story 卡同步使用淺色設計
- 多層問題舞台、3D 答案卡、指標訊號、選擇動畫同沉浸式結果 reveal
- 原生分享、複製朋友配對連結，同 1080×1920 Instagram Story 人格卡下載／分享
- Story 卡重新整理成有留白嘅人物 recap：集中顯示 fun fact、人口比例、最佳拍檔人物＋Match 分數、組隊加成同朋友測驗 CTA
- 原有 16 個高清人物，加上全新「躺卡」男女角色，共 18 個人物；結果頁使用獨立 1752×1796 人物檔，避免放大合併圖造成模糊
- 推算預算仍然只加入 Nora prompt，但已移除括號價格範圍，例如只顯示 `HK$300 左右`，唔再顯示 `（約 HK$250–350）`
- 已逐段校對結果頁同互動文案，用香港人自然會睇嘅書面廣東話，並移除「VinoBuzz 現有主流葡萄」標籤
- 男女角色切換掣已搬到人物相框上方嘅獨立控制列，唔會再遮住角色或相框內容
- 結果主角改用 16 張獨立 1752×1796 高清人物圖；移除相框 3D tilt，並用整數位移動畫，避免 sprite 拉伸、縮放與旋轉令畫面變矇

## 正式接入備註

- Replace demo analytics in `track()` with GA4/PostHog.
- Persist the computed `scores` object to the VinoBuzz profile after authentication.
- Connect the Nora CTA to a prefilled deep link using the generated prompt.
- Persist both the structural/social score vector and the 11-family flavour-wheel vector; the headline personality alone is not a complete recommendation profile.
- Host the asset locally/CDN and add final Open Graph image/domain before launch.
- Replace the launch match matrix only when real friend-pair completion data is sufficient; the current 45-combination matrix is entertainment-led campaign logic.
- The static mainstream grape set was checked against the VinoBuzz in-stock SKU API on 2026-08-17. Production should still refresh/validate availability through the API rather than treating prototype copy as permanent inventory truth.

VBTI is approachable taste discovery, not a clinical or scientific personality assessment. It is not affiliated with MBTI®.
