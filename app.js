const DIMENSIONS = ["body", "fresh", "tannin", "sweet", "aroma", "discovery", "social", "control", "value", "care"];
const FLAVOR_DIMENSIONS = ["citrus", "tree", "stone", "tropical", "redfruit", "blackfruit", "floral", "herbal", "spice", "oak", "earthy"];
const FLAVOR_LABELS = {
  citrus: "柑橘",
  tree: "青蘋果／梨",
  stone: "白桃／核果",
  tropical: "熱帶水果",
  redfruit: "士多啤梨／紅果",
  blackfruit: "黑莓／黑果",
  floral: "花香",
  herbal: "草本",
  spice: "香料",
  oak: "木桶／烘烤",
  earthy: "泥土／鹹香"
};

const questions = [
  {
    kicker: "你喺朋友群組嘅角色",
    title: "星期五晚，個 group 終於約得成。你通常會……",
    note: "揀一個最似你平時做法嘅答案。",
    answers: [
      { title: "訂枱、定時間、叫酒", sub: "我通常都係負責組織嗰個。", v: { social: 95, control: 92, discovery: 62, body: 67 } },
      { title: "遲到都要搞氣氛", sub: "安排行程唔係我強項，搞氣氛就係。", v: { social: 93, control: 24, aroma: 75, discovery: 64 } },
      { title: "提議去新餐廳", sub: "我鍾意試新嘢。", v: { social: 68, discovery: 98, control: 36, aroma: 70 } },
      { title: "留喺屋企慢慢飲", sub: "安靜一晚更加吸引。", v: { social: 12, control: 65, discovery: 25, body: 60 } }
    ]
  },
  {
    kicker: "味覺校準 · 唔使識酒",
    title: "以下邊款飲品係你最鍾意？",
    note: "揀你平時最想飲嗰款；我哋會用佢校準甜度、酸度、濃度、苦味同香氣偏好。",
    answers: [
      { title: "鮮檸梳打，再加多片檸檬", sub: "明亮、帶酸、夠清爽。", v: { fresh: 95, sweet: 38, body: 18, tannin: 14, aroma: 68 }, f: { citrus: 98, tree: 48, stone: 22, tropical: 18, redfruit: 12, blackfruit: 5, floral: 20, herbal: 34, spice: 8, oak: 2, earthy: 5 } },
      { title: "茶味夠濃嘅港式奶茶", sub: "濃郁、順滑、味道夠實在。", v: { fresh: 28, sweet: 68, body: 82, tannin: 55, aroma: 50 }, f: { citrus: 8, tree: 20, stone: 25, tropical: 32, redfruit: 12, blackfruit: 18, floral: 28, herbal: 42, spice: 62, oak: 66, earthy: 30 } },
      { title: "齋啡，唔加糖", sub: "濃、乾身，帶少少苦味。", v: { fresh: 34, sweet: 5, body: 70, tannin: 88, aroma: 62 }, f: { citrus: 18, tree: 8, stone: 8, tropical: 5, redfruit: 12, blackfruit: 32, floral: 5, herbal: 20, spice: 58, oak: 94, earthy: 82 } },
      { title: "白桃凍茶", sub: "香甜、果味明顯、容易入口。", v: { fresh: 65, sweet: 72, body: 32, tannin: 22, aroma: 88 }, f: { citrus: 38, tree: 50, stone: 98, tropical: 58, redfruit: 30, blackfruit: 8, floral: 82, herbal: 18, spice: 12, oak: 4, earthy: 5 } }
    ]
  },
  {
    kicker: "今晚食乜好",
    title: "如果而家揀晚餐，你最想食邊樣？",
    note: "你鍾意嘅食物，可以反映你對酒體、清爽度同香氣嘅偏好。",
    answers: [
      { title: "刺身或者生蠔", sub: "乾淨、細緻、夠新鮮。", v: { body: 18, fresh: 96, tannin: 8, sweet: 12, aroma: 62 }, f: { citrus: 88, tree: 72, herbal: 48, earthy: 38 } },
      { title: "叉燒或者燒鴨", sub: "濃香、惹味、帶少少甜。", v: { body: 72, fresh: 42, tannin: 48, sweet: 58, aroma: 72 }, f: { redfruit: 74, blackfruit: 68, spice: 82, oak: 58 } },
      { title: "黑椒牛扒", sub: "味道夠重，帶焦香同肉感。", v: { body: 96, fresh: 35, tannin: 92, sweet: 8, aroma: 48 }, f: { blackfruit: 96, redfruit: 52, spice: 92, oak: 78, earthy: 66 } },
      { title: "泰式咖喱或者打邊爐", sub: "香辣、有層次、夠刺激。", v: { body: 57, fresh: 75, tannin: 20, sweet: 52, aroma: 96, discovery: 78 }, f: { tropical: 82, stone: 56, herbal: 76, spice: 98, citrus: 52 } }
    ]
  },
  {
    kicker: "口感測試",
    title: "有人沖茶，你最理想嗰杯係……",
    note: "茶嘅濃淡，可以幫我哋估計你對單寧同澀感嘅接受程度。",
    answers: [
      { title: "清淡花香型", sub: "細緻、清香、飲落舒服。", v: { tannin: 10, body: 20, aroma: 92, fresh: 75 }, f: { floral: 98, herbal: 72, tree: 52 } },
      { title: "順滑平衡型", sub: "唔會太淡，亦唔會太濃。", v: { tannin: 42, body: 48, aroma: 62, fresh: 55 }, f: { tree: 68, floral: 58, stone: 48, spice: 28 } },
      { title: "濃茶，飲完口腔有少少乾", sub: "我鍾意實在、有力度嘅口感。", v: { tannin: 94, body: 83, sweet: 8, control: 75 }, f: { herbal: 88, earthy: 60, oak: 68, spice: 55 } },
      { title: "加奶加糖，香濃順口", sub: "甜滑、圓潤、有安慰感。", v: { tannin: 35, body: 72, sweet: 82, fresh: 25 }, f: { spice: 72, oak: 64, tropical: 48, stone: 44 } }
    ]
  },
  {
    kicker: "甜度測試",
    title: "甜品送到，你會點揀？",
    note: "呢題會幫我哋了解你平時鍾意幾甜。",
    answers: [
      { title: "唔食甜品，芝士或再飲一杯", sub: "我通常比較鍾意鹹香味。", v: { sweet: 4, tannin: 67, body: 65, control: 72 }, f: { earthy: 86, oak: 58, spice: 48, herbal: 45 } },
      { title: "食幾啖就夠", sub: "可以有少少甜，但唔好太多。", v: { sweet: 36, fresh: 67, body: 45 } },
      { title: "楊枝甘露或者水果甜品", sub: "甜品本身就係成餐嘅一部分。", v: { sweet: 78, body: 61, aroma: 74 }, f: { tropical: 94, stone: 72, citrus: 48, floral: 42 } },
      { title: "未睇主菜，先睇甜品餐牌", sub: "甜味對我嚟講好重要。", v: { sweet: 98, social: 62, control: 32, aroma: 82 } }
    ]
  },
  {
    kicker: "香氣雷達",
    title: "以下邊組香氣最吸引你？",
    note: "你揀嘅香氣，可以幫我哋分辨你偏向果香、花香定鹹香風格。",
    answers: [
      { title: "柑橘皮同青蘋果", sub: "清新、爽脆、乾淨。", v: { aroma: 62, fresh: 95, body: 20, sweet: 18 }, f: { citrus: 100, tree: 94, stone: 28, tropical: 18, redfruit: 10, blackfruit: 5, floral: 32, herbal: 48, spice: 8, oak: 2, earthy: 8 } },
      { title: "熟莓果、布冧同暖香料", sub: "濃郁、果味豐富、有溫暖感。", v: { aroma: 80, body: 78, sweet: 42, tannin: 60 }, f: { citrus: 12, tree: 22, stone: 58, tropical: 28, redfruit: 88, blackfruit: 96, floral: 18, herbal: 20, spice: 86, oak: 48, earthy: 30 } },
      { title: "花香、白桃同香水感", sub: "香氣突出、細緻、有表現力。", v: { aroma: 98, fresh: 70, sweet: 48, body: 30 }, f: { citrus: 38, tree: 42, stone: 98, tropical: 62, redfruit: 28, blackfruit: 8, floral: 100, herbal: 20, spice: 18, oak: 4, earthy: 5 } },
      { title: "香草、泥土同煙燻", sub: "鹹香、複雜，帶少少不一樣。", v: { aroma: 35, discovery: 92, tannin: 70, sweet: 8, body: 70 }, f: { citrus: 8, tree: 15, stone: 12, tropical: 8, redfruit: 30, blackfruit: 48, floral: 12, herbal: 78, spice: 75, oak: 95, earthy: 100 } }
    ]
  },
  {
    kicker: "睇酒牌嘅習慣",
    title: "酒牌一放低，你第一步通常會做乜？",
    note: "揀最接近你真實做法嘅答案。",
    answers: [
      { title: "先睇產區、年份同酒莊", sub: "我想清楚知道自己叫緊乜。", v: { control: 98, discovery: 52, tannin: 72, sweet: 8, value: 45 } },
      { title: "直接問人推薦一支", sub: "有一個清楚答案就夠。", v: { control: 20, social: 62, discovery: 45, value: 35 } },
      { title: "揀最少見、最特別嗰杯", sub: "我寧願試一樣新嘢。", v: { control: 25, discovery: 100, aroma: 48, value: 20 } },
      { title: "搵最穩陣又抵飲嘅選擇", sub: "價錢合理、質素好最重要。", v: { control: 88, discovery: 25, social: 54, body: 55, value: 100 } }
    ]
  },
  {
    kicker: "清爽度測試",
    title: "你對氣泡同酸爽飲品有咩感覺？",
    note: "酸度會令酒更有活力，但唔一定代表酸到皺眉。",
    answers: [
      { title: "愈凍、愈酸爽愈好", sub: "我鍾意爽脆、有活力嘅飲品。", v: { fresh: 100, body: 15, tannin: 8, sweet: 18 } },
      { title: "鍾意氣泡，但想柔和易入口", sub: "要清新，但唔好太尖銳。", v: { fresh: 72, sweet: 52, body: 32, social: 82 } },
      { title: "間中可以，但更鍾意順滑", sub: "我偏好柔和、飽滿啲嘅口感。", v: { fresh: 35, body: 70, sweet: 44, tannin: 35 } },
      { title: "麻麻哋，我鍾意沉實酒體", sub: "清爽感對我冇咁重要。", v: { fresh: 15, body: 85, tannin: 75, control: 72 } }
    ]
  },
  {
    kicker: "帶酒去飯局",
    title: "要帶一支酒去一個唔太熟嘅人嘅飯局，你會揀……",
    note: "最能夠考驗你揀酒信心嘅時刻。",
    answers: [
      { title: "大家都認得嘅牌子", sub: "想穩陣啲，最好大部分人都接受。", v: { discovery: 12, control: 88, social: 70, body: 68, care: 72 } },
      { title: "特別得嚟有故事嘅酒", sub: "想支酒令人有印象。", v: { discovery: 94, control: 52, social: 80, aroma: 45, care: 62 } },
      { title: "氣泡酒", sub: "有氣氛，又容易同大家分享。", v: { fresh: 88, body: 22, social: 95, sweet: 38, care: 48 } },
      { title: "先問清楚主人家幾條問題", sub: "我要確保支酒真係啱場合。", v: { control: 96, social: 55, discovery: 30, aroma: 60, care: 100 } }
    ]
  },
  {
    kicker: "餐廳酒牌習慣",
    title: "平時在餐廳會如何選酒？",
    note: "揀最接近你平時做法嘅答案。",
    answers: [
      { title: "先睇食物，再揀最襯嗰支", sub: "想搵一個大家都飲得開心嘅配搭。", v: { control: 78, social: 90, fresh: 58, body: 65, value: 40, care: 60 } },
      { title: "揀支少見、未試過嘅酒", sub: "去餐廳就想試啲新嘢。", v: { discovery: 98, aroma: 45, control: 45, value: 25, care: 30 } },
      { title: "揀熟悉、多人接受嘅穩陣款", sub: "最重要係大部分人都鍾意。", v: { discovery: 18, social: 92, sweet: 42, tannin: 35, value: 35, care: 82 } },
      { title: "先格價，再揀最抵飲嗰支", sub: "想喺成張酒牌搵到最高性價比。", v: { control: 96, discovery: 42, social: 55, value: 100, care: 35 } }
    ]
  },
  {
    kicker: "收工後嘅心情",
    title: "攰咗成日，邊種酒最啱而家嘅你？",
    note: "心情會影響味覺，所以飲酒場景都係口味輪廓嘅一部分。",
    answers: [
      { title: "濃郁、深色、有酒體", sub: "夠厚重，等個人慢慢靜落嚟。", v: { body: 98, tannin: 74, fresh: 25, sweet: 25 }, f: { blackfruit: 94, redfruit: 58, spice: 82, oak: 78, earthy: 52 } },
      { title: "輕盈、夠凍、夠清爽", sub: "乾淨爽脆，唔使諗太多。", v: { body: 15, fresh: 98, tannin: 5, sweet: 22 }, f: { citrus: 95, tree: 82, herbal: 55, floral: 42 } },
      { title: "柔和、果香、舒服", sub: "口感順滑，味道溫柔。", v: { body: 58, fresh: 38, tannin: 28, sweet: 62, aroma: 82 }, f: { redfruit: 86, stone: 78, floral: 66, tropical: 58 } },
      { title: "一樣我未試過嘅酒", sub: "新口味會令今晚有趣啲。", v: { discovery: 100, aroma: 48, control: 20 } }
    ]
  },
  {
    kicker: "就快完成",
    title: "朋友斟咗杯神秘酒，話：『信我啦。』你會……",
    note: "你有幾接受喺唔知係咩酒嘅情況下先試？",
    answers: [
      { title: "飲咗先，之後再問", sub: "我鍾意有驚喜。", v: { discovery: 100, control: 10, social: 78 } },
      { title: "聞一聞、飲一啖，估完先問", sub: "我鍾意自己慢慢拆解。", v: { discovery: 72, control: 78, aroma: 80 } },
      { title: "飲之前先問清楚係咩酒", sub: "我想知道自己杯入面係乜。", v: { discovery: 40, control: 100, tannin: 60 } },
      { title: "等其他人試完再睇反應", sub: "我寧願避開一個唔好嘅驚喜。", v: { discovery: 5, control: 62, social: 38, sweet: 45 } }
    ]
  },
  {
    kicker: "第一次約會會食乜",
    title: "第一次約會揀晚餐，你最自然會揀邊一種？",
    note: "唔使諗價錢，揀一個你覺得最舒服、最似自己嘅安排。",
    answers: [
      { title: "日式放題，選擇多又輕鬆", sub: "大家各自揀鍾意食嘅，最實際。", budget: 300, v: { value: 95, social: 78, control: 35, discovery: 30 } },
      { title: "喺屋企親手煮一餐", sub: "夠用心，成晚節奏亦可以自己掌握。", budget: 500, v: { social: 68, value: 60, control: 78, care: 92, body: 55 } },
      { title: "牛扒晚餐，氣氛行先", sub: "環境、服務同食物都要有返咁上下。", budget: 800, v: { body: 88, control: 75, care: 65, social: 72 } },
      { title: "Omakase，交畀師傅安排", sub: "重視完整體驗，值得就願意花多少少。", budget: 1500, v: { discovery: 85, control: 30, care: 75, aroma: 80 } }
    ]
  },
  {
    kicker: "飲到中段嘅你",
    title: "飲咗幾杯之後，你通常會變成點？",
    note: "揀最常發生嗰個情況，唔使扮飲得。",
    answers: [
      { title: "飲大咗就攬住朋友講心事", sub: "情緒價值畀足，電量就好快用完。", typeBoost: "LAY", v: { social: 92, control: 8, care: 96, sweet: 58 } },
      { title: "愈飲愈精神，繼續乾杯", sub: "其他人想走，我先啱啱開始。", typeBoost: "VIBE", v: { social: 100, control: 12, care: 35, discovery: 62 } },
      { title: "同平時一樣，照樣慢慢飲", sub: "我知自己飲到邊，唔會亂嚟。", v: { social: 48, control: 86, care: 62, body: 55 } },
      { title: "飲水食嘢，夠鐘就收手", sub: "開心還開心，聽朝都要做人。", v: { social: 58, control: 96, care: 78, value: 68 } }
    ]
  }
];

const iconPaths = {
  people: '<circle cx="8" cy="9" r="3"/><circle cx="16" cy="8" r="2.5"/><path d="M3 20c.5-4 2.4-6 5-6s4.5 2 5 6M13 14c3.3-.8 6 1.3 6.5 5"/>',
  glass: '<path d="M5 3h14l-1.4 7.2A5.7 5.7 0 0 1 12 15a5.7 5.7 0 0 1-5.6-4.8L5 3Z"/><path d="M7 9h10M12 15v6M8 21h8"/>',
  plate: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M3 4v7M5 4v7M4 11v9M20 4v16"/>',
  cup: '<path d="M5 7h12v7a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V7Z"/><path d="M17 9h1a3 3 0 0 1 0 6h-1M8 3c0 1 1 1 1 2M12 3c0 1 1 1 1 2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
  flower: '<circle cx="12" cy="12" r="2.5"/><path d="M12 9c-4-1-4-6 0-6 4 0 4 5 0 6ZM15 12c1-4 6-4 6 0 0 4-5 4-6 0ZM12 15c4 1 4 6 0 6-4 0-4-5 0-6ZM9 12c-1 4-6 4-6 0 0-4 5-4 6 0Z"/>',
  menu: '<path d="M5 3h14v18H5z"/><path d="M8 7h8M8 11h8M8 15h5"/>',
  bubble: '<circle cx="8" cy="15" r="5"/><circle cx="16" cy="8" r="3"/><circle cx="17" cy="17" r="2"/>',
  gift: '<path d="M3 9h18v4H3zM5 13h14v8H5zM12 9v12"/><path d="M12 9H8.5a2.5 2.5 0 1 1 2.1-3.8L12 9Zm0 0h3.5a2.5 2.5 0 1 0-2.1-3.8L12 9Z"/>',
  scan: '<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/><path d="M8 8h8v8H8z"/>',
  moon: '<path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z"/>',
  mystery: '<circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 3.3 2.2c-.8.4-1.1.9-1.1 1.8M12 17h.01"/>',
  heart: '<path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 22l8.8-8.8a5.2 5.2 0 0 0 0-7.4Z"/>',
  spark: '<path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
  home: '<path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7"/>',
  citrus: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/>',
  coffee: '<path d="M5 7h12v7a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V7ZM17 9h1a3 3 0 0 1 0 6h-1"/><path d="M8 3v2M12 3v2"/>',
  fish: '<path d="M4 12c3-4 7-6 12-3l4-3v12l-4-3c-5 3-9 1-12-3Z"/><circle cx="14" cy="11" r=".7"/>',
  flame: '<path d="M13 2c1 5-4 5-2 9 1-2 3-2 4-4 3 3 4 6 2 10a6 6 0 0 1-11-3c0-3 2-5 4-7 0 3 1 4 2 4-1-4 1-6 1-9Z"/>',
  tag: '<path d="M3 4h8l10 10-7 7L4 11V4Z"/><circle cx="8" cy="8" r="1.3"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  diamond: '<path d="m12 3 8 6-8 12L4 9l8-6Z"/><path d="m4 9 8 4 8-4M12 13v8"/>',
  eye: '<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/>'
};

function iconSvg(name, className = "") {
  const paths = iconPaths[name] || iconPaths.spark;
  return `<svg class="line-icon ${className}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}

function answerIconSvg(name, className = "") {
  return `<svg class="line-icon ${className}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use href="assets/tabler-answer-icons.svg#${name}"></use></svg>`;
}

const questionIcons = ["people", "glass", "plate", "cup", "layers", "flower", "menu", "bubble", "gift", "scan", "moon", "mystery", "heart", "moon"];
const stageCopies = [
  "睇吓你喺一班人入面，通常自然會擔當咩角色。",
  "唔使識酒，用你平時鍾意嘅飲品校準味覺。",
  "食物重量同香料，會透露你偏好邊種酒體。",
  "茶嘅濃淡，會反映你對單寧同口感嘅接受度。",
  "你點樣食甜品，會幫我哋理解你嘅甜度偏好。",
  "跟住你最鍾意嘅氣味行，答案通常最準。",
  "你點睇酒牌，反映你想探索定想掌握全局。",
  "清爽度係葡萄酒個性入面，好重要嘅一部分。",
  "帶酒去飯局，最能夠睇出你重視穩陣定驚喜。",
  "你點樣睇餐廳酒牌，會反映你最重視配餐、穩陣、探索定性價比。",
  "同一個人喺唔同心情下，都會想飲唔同嘅酒。",
  "面對未知嘅酒，睇吓你好奇心會唔會行先一步。",
  "用一餐約會，補完整個飲酒情境輪廓。",
  "最後睇埋你飲到中段嘅真實狀態，結果就完整。"
];
const answerVisuals = [
  ["calendar-event", "confetti", "building-store", "home"],
  ["lemon-2", "bubble-tea-2", "coffee", "cup"],
  ["fish", "meat", "grill", "bowl-chopsticks"],
  ["flower", "scale", "teapot", "milk"],
  ["cheese", "cookie", "bowl-spoon", "cake"],
  ["apple", "cherry", "perfume", "plant-2"],
  ["clipboard-list", "user-question", "sparkle", "receipt-dollar"],
  ["snowflake", "glass-champagne", "glass", "barrel"],
  ["badge", "book-2", "bottle", "home-question"],
  ["tools-kitchen-2", "compass", "users-group", "tags"],
  ["glass-full", "feather", "heart", "help-hexagon"],
  ["hand-click", "wind", "message-circle-question", "eye"],
  ["tools-kitchen-3", "home-heart", "grill-spatula", "chef-hat"],
  ["message-heart", "bolt", "gauge", "droplet-off"]
];

// Mobile copy is intentionally editorial rather than auto-wrapped. Each item
// contains one or two complete phrase rows so Cantonese never breaks mid-idea.
const mobileQuestionCopy = [
  "Friday 晚，你係邊種隊友？", "你最鍾意邊款飲品？", "今晚最想食乜？", "你鍾意飲邊種茶？",
  "甜品你點揀？", "邊組香氣最吸引？", "拎起酒牌，你會先做乜？", "你鍾意幾酸爽？",
  "帶酒去飯局，你會揀？", "餐廳點樣揀酒？", "收工後想飲邊種？", "神秘酒遞到面前，你會？",
  "第一次約會食乜？", "飲幾杯後，你會變成？"
];
const mobileAnswerCopy = [
  [["訂枱定時間","再幫手叫酒"],["遲到都要","搞氣氛"],["提議去間","新餐廳"],["留喺屋企","慢慢飲"]],
  [["鮮檸梳打","多片檸檬"],["濃茶味","港式奶茶"],["齋啡","唔加糖"],["白桃凍茶"]],
  [["刺身或生蠔"],["叉燒或燒鴨"],["黑椒牛扒"],["泰式咖喱","或打邊爐"]],
  [["清淡花香"],["順滑平衡"],["濃茶","帶少少澀"],["加奶加糖","香濃順口"]],
  [["唔食甜品","食芝士"],["食幾啖","就夠"],["楊枝甘露","或水果甜品"],["未睇主菜","先睇甜品"]],
  [["柑橘皮","青蘋果"],["熟莓果","暖香料"],["花香白桃","香水感"],["香草泥土","煙燻"]],
  [["先睇產區","年份酒莊"],["直接問人","推薦一支"],["揀最少見","最特別嗰杯"],["搵最穩陣","又抵飲"]],
  [["愈凍愈酸","愈好"],["鍾意氣泡","但要柔和"],["間中可以","偏好順滑"],["麻麻哋","鍾意沉實酒體"]],
  [["大家認得","嘅牌子"],["特別得嚟","有故事"],["氣泡酒","容易分享"],["先問主人家","幾條問題"]],
  [["先睇食物","再揀配搭"],["揀支少見","未試過嘅酒"],["揀熟悉","多人接受"],["先格價","再揀最抵飲"]],
  [["濃郁深色","有酒體"],["輕盈夠凍","夠清爽"],["柔和果香","飲落舒服"],["揀一支","未試過嘅酒"]],
  [["飲咗先","之後再問"],["聞一聞","估完先問"],["飲之前","先問清楚"],["等人試完","再睇反應"]],
  [["日式放題","輕鬆實際"],["屋企煮飯","夠用心"],["牛扒晚餐","氣氛行先"],["Omakase","交畀師傅"]],
  [["飲大咗","講心事"],["愈飲愈精神","繼續乾杯"],["照樣慢慢飲","唔會亂嚟"],["飲水食嘢","夠鐘收手"]]
];

const types = [
  {
    code: "HOST", name: "飯局主理人", color: "#F2750A", cell: [0, 0], population: 5, rarity: "稀有角色", ratio: "約 20 人有 1 個",
    populationWhy: "肯幫成枱人揀酒、仲敢拍板嘅人唔多，所以你比較少見。",
    proto: { body: 72, fresh: 50, tannin: 65, sweet: 22, aroma: 55, discovery: 58, social: 88, control: 82, value: 42, care: 64 },
    roast: "成枱人都話冇所謂，最後一定係你拍板。你會睇食物、預算同大家口味，再揀一支最穩陣嘅酒。",
    squadSummary: "全枱決策人：識睇餸、睇預算，最後揀一支大家都飲得開心嘅酒。",
    truth: "大家信你揀酒，你就最有滿足感。",
    scene: "你會先問大家食乜、預算幾多，再直接揀一支。",
    wines: ["Cabernet Sauvignon", "Merlot", "Syrah / Shiraz"],
    match: "你適合酒體較實、味道清楚又容易配餐嘅紅酒。",
    prompt: "幫我揀一支有結構、適合配餐嘅酒。我鍾意乾身、酒體較豐滿、帶鹹香層次同明顯單寧嘅風格。"
  },
  {
    code: "SNAP", name: "手機飲先", color: "#F2750A", cell: [1, 0], population: 15, rarity: "常見角色", ratio: "大約每 7 人有 1 個",
    populationWhy: "好多人揀酒都會先睇酒標同賣相，所以呢類飲家幾常見。",
    proto: { body: 38, fresh: 72, tannin: 24, sweet: 44, aroma: 82, discovery: 55, social: 86, control: 34, value: 28, care: 42 },
    roast: "支酒未開，你已經睇緊酒標、酒色同現場光線。對你嚟講，好飲重要，好睇都一樣重要。",
    squadSummary: "視覺系飲家：支酒要好飲、好睇，放上枱最好仲要影得靚。",
    truth: "賣相係飲酒體驗一部分，冇需要扮唔在意。",
    scene: "支酒一上枱，你會先影張相，影好先同大家慢慢飲。",
    wines: ["Pinot Gris / Pinot Grigio", "Sauvignon Blanc", "Chardonnay"],
    match: "你適合清新、果香明顯、賣相又靚嘅白酒。",
    prompt: "幫我揀一支優雅、香氣突出又上鏡嘅酒。要清新、精緻，而且容易同朋友一齊享受。"
  },
  {
    code: "SEEK", name: "冷門酒探員", color: "#F2750A", cell: [2, 0], population: 7, rarity: "少數派", ratio: "大約每 14 人有 1 個",
    populationWhy: "大部分人會揀熟悉嘅酒，主動試冷門葡萄同新產區嘅人始終較少。",
    proto: { body: 55, fresh: 65, tannin: 46, sweet: 22, aroma: 46, discovery: 88, social: 70, control: 32, value: 24, care: 32 },
    roast: "愈少人聽過嘅酒，你愈想試。熟悉嘅酒夠穩陣，但新口味先令你興奮。",
    squadSummary: "好奇探索派：鍾意試新葡萄、新產區，飲酒就似用味覺去旅行。",
    truth: "熟酒令人安心，新酒先有驚喜。",
    scene: "你會揀一支全枱都未試過嘅酒，叫大家一齊開眼界。",
    wines: ["Gamay", "Grenache", "Riesling"],
    match: "你適合有特色、夠清新，又唔係周街都見到嘅酒。",
    prompt: "用一支有個性、較少見嘅酒畀我驚喜。我鍾意清新活力、鹹香細節同特別葡萄品種，多過單純追求名牌。"
  },
  {
    code: "CELL", name: "酒單學霸", color: "#F2750A", cell: [3, 0], population: 3, rarity: "極稀有", ratio: "約 33 人先有 1 個",
    populationWhy: "會認真研究年份、產區同酒莊嘅人始終係少數。",
    proto: { body: 78, fresh: 42, tannin: 78, sweet: 10, aroma: 44, discovery: 32, social: 46, control: 88, value: 48, care: 46 },
    roast: "你會睇年份、產區同酒莊，推薦得好都要講得出原因。對你嚟講，飲酒係享受，亦係研究。",
    squadSummary: "認真品酒派：會睇年份、產區同結構，慢慢飲先最有樂趣。",
    truth: "你知自己鍾意乜，亦重視穩定質素。",
    scene: "你會先睇酒莊、產區同年份，再慢慢聞香試味。",
    wines: ["Cabernet Sauvignon", "Pinot Noir", "Chardonnay"],
    match: "你適合乾身、有結構、出名穩定嘅經典酒款。",
    prompt: "推薦一支認真、經典、乾身嘅紅酒，要有紮實結構、深度，同埋可靠產區或酒莊風格。唔需要花巧。"
  },
  {
    code: "COZY", name: "Chill住飲", color: "#F2750A", cell: [0, 1], population: 14, rarity: "常見角色", ratio: "大約每 7 人有 1 個",
    populationWhy: "唔少人飲酒只係想放鬆，屋企慢慢飲就最舒服。",
    proto: { body: 58, fresh: 36, tannin: 28, sweet: 58, aroma: 74, discovery: 28, social: 22, control: 58, value: 40, care: 38 },
    roast: "你飲酒係為咗放鬆，唔係上堂。柔和、果味夠、容易入口，就最啱你。",
    squadSummary: "舒服慢飲派：唔追熱鬧，鍾意喺熟悉地方同啱傾嘅人慢慢飲。",
    truth: "容易入口、飲得舒服，就係好酒。",
    scene: "你會揀個舒服位置，慢慢飲，唔趕住開下一支。",
    wines: ["Pinot Noir", "Merlot", "Riesling"],
    match: "你適合果味夠、單寧低、柔和易飲嘅酒。",
    prompt: "幫我揀一支適合安靜一晚、柔和舒服嘅酒。我鍾意果味充足、單寧低，唔要太尖銳或者太進取。"
  },
  {
    code: "DEAL", name: "抵飲獵人", color: "#F2750A", cell: [1, 1], population: 17, rarity: "常見角色", ratio: "大約每 6 人有 1 個",
    populationWhy: "好多人買酒都會先問值唔值，所以性價比派非常常見。",
    proto: { body: 56, fresh: 55, tannin: 45, sweet: 22, aroma: 52, discovery: 38, social: 70, control: 84, value: 98, care: 38 },
    roast: "你想飲好酒，但唔想為名氣畀多幾百蚊。搵到又平又好飲嗰支，你會特別有成功感。",
    squadSummary: "性價比獵人：識喺價錢同質素之間搵平衡，最怕為名氣交學費。",
    truth: "買得抵，飲落自然更開心。",
    scene: "你會比較幾支酒嘅價錢同風格，再揀最抵飲嗰支。",
    wines: ["Shiraz", "Cabernet Sauvignon", "Pinot Grigio"],
    match: "你適合平衡、百搭、質素高過價錢嘅酒。",
    prompt: "幫我搵最抵飲嘅酒，唔係純粹最平。我想要平衡、容易配餐、有真實個性，而且少啲名氣溢價。"
  },
  {
    code: "GIFT", name: "送禮神隊友", color: "#F2750A", cell: [2, 1], population: 9, rarity: "特定場合型", ratio: "大約每 11 人有 1 個",
    populationWhy: "呢類人平時未必成日買酒，但一到送禮就會特別認真。",
    proto: { body: 65, fresh: 52, tannin: 54, sweet: 20, aroma: 60, discovery: 30, social: 70, control: 88, value: 42, care: 100 },
    roast: "你揀酒最重視對方收到開唔開心。要啱場合、有體面，最好仲睇得出你有花心思。",
    squadSummary: "場合照顧派：識睇對象同場合，最重要係令人收得開心。",
    truth: "你揀酒嘅時間，可能比寫張卡仲耐。",
    scene: "帶酒去飯局前，你會先問主人家喜好，再揀一支穩陣又得體嘅酒。",
    wines: ["Chardonnay", "Pinot Noir", "Cabernet Sauvignon"],
    match: "你適合包裝得體、質素穩定、大部分人都接受嘅酒。",
    prompt: "幫我揀一支有體面又有心思嘅禮物酒。喺預算內優先考慮有認受性嘅質素、優雅外觀同廣泛接受度。"
  },
  {
    code: "VIBE", name: "氣氛酒鬼", color: "#F2750A", cell: [3, 1], population: 20, rarity: "最常見角色", ratio: "大約每 5 人有 1 個",
    populationWhy: "最多人飲酒都係為咗朋友同氣氛，唔係為咗研究酒。",
    proto: { body: 52, fresh: 58, tannin: 38, sweet: 42, aroma: 52, discovery: 52, social: 98, control: 12, value: 48, care: 22 },
    roast: "枱面有乜你就飲乜，酒名記唔記得都冇所謂。你係氣氛小組，永遠第一個叫成枱人 Cheers。",
    squadSummary: "氣氛小組：枱面有乜就飲乜，第一個叫 Cheers，成晚有佢先真正著機。",
    truth: "支酒叫咩名唔係重點，全枱肯一齊舉杯先係。",
    scene: "大家仲研究緊酒標，你已經企起身叫：『嚟啦，飲咗先講！』",
    wines: ["Pinot Grigio", "Sauvignon Blanc", "Moscato"],
    match: "你適合清爽、易入口、成班人都可以即開即飲嘅酒。",
    prompt: "幫我揀一支容易入口、夠百搭、適合成班朋友一齊 Cheers 嘅酒。唔使太複雜，最緊要大家都飲得開心。"
  },
  {
    code: "LAY", name: "躺卡", color: "#F2750A", cell: [0, 2], population: 10, rarity: "每圍都有機會出現", ratio: "大約每 10 人有 1 個",
    populationWhy: "唔係人人都飲得多；一班朋友入面，通常總有一個最早要休息。",
    proto: { body: 42, fresh: 55, tannin: 25, sweet: 58, aroma: 62, discovery: 42, social: 88, control: 12, value: 45, care: 96 },
    roast: "你通常最早話要抖一抖，嚴重時仲要朋友照顧。不過你飲咗酒特別真心，會畀足情緒價值，仲可能突然同朋友酒後吐真情。",
    squadSummary: "酒量有限、真心無限：最早要休息，但最肯聽人講心事，醉咗仲會真情告白。",
    truth: "你未必飲到最後，但你講嗰句真心話，大家會記得最耐。",
    scene: "飲到中段，你會攬住朋友講心事；講完冇耐，就開始問邊度有位可以瞓。",
    wines: ["Moscato", "Riesling", "Pinot Grigio"],
    match: "你適合酒精感較低、帶果香、容易慢慢飲嘅酒。",
    prompt: "幫我揀一支酒精感較低、果香明顯、容易入口嘅酒。最好可以慢慢飲，唔好太濃或者太澀。"
  }
];

const TEAM_DATA = {
  HOST: {
    good: [{ code: "VIBE", score: 96, reason: "你負責拍板，佢負責令全枱人舉杯。" }, { code: "DEAL", score: 91, reason: "你定方向，佢守住性價比，成枱最穩。" }],
    clash: { code: "CELL", score: 42, reason: "兩個都想做最終決定，酒未開已經辯論年份。" },
    combo: { code: "VIBE", name: "全枱起身 Cheers 權", ability: "你一揀酒，佢一叫飲，全枱人會自動放低電話舉杯。號召力加成 50%。" }
  },
  SNAP: {
    good: [{ code: "VIBE", score: 94, reason: "你捕捉靚畫面，佢製造最自然嘅乾杯時刻。" }, { code: "GIFT", score: 90, reason: "你識靚，佢識體面，帶酒出場零失禮。" }],
    clash: { code: "DEAL", score: 44, reason: "你先睇靚唔靚，佢第一句永遠係：『值唔值呀？』" },
    combo: { code: "GIFT", name: "IG Story 自帶高級感", ability: "任何普通飯局都會突然似品牌活動，連支酒個紙袋都有人想影。" }
  },
  SEEK: {
    good: [{ code: "DEAL", score: 93, reason: "你搵冷門，佢搵抵飲，新世界由你哋發現。" }, { code: "VIBE", score: 89, reason: "你乜都敢試，佢乜都肯飲，冇酒會被冷落。" }],
    clash: { code: "GIFT", score: 48, reason: "你想送一支冇人聽過嘅，佢只想確保對方唔會呆一呆。" },
    combo: { code: "DEAL", name: "冷門抵飲雷達", ability: "可以喺一張 80 支酒嘅酒牌入面，五分鐘鎖定最少人識但最抵飲嗰支。" }
  },
  CELL: {
    good: [{ code: "GIFT", score: 92, reason: "你識品質，佢識場合，出手穩過保險箱。" }, { code: "COZY", score: 87, reason: "你負責酒嘅深度，佢負責提醒大家慢慢飲。" }],
    clash: { code: "HOST", score: 42, reason: "兩個人都想揸主意，侍酒師會默默行開。" },
    combo: { code: "COZY", name: "陳年慢飲結界", ability: "全枱突然願意收聲十秒聞香，平時最嘈嗰個都會講句：『幾有層次喎。』" }
  },
  COZY: {
    good: [{ code: "DEAL", score: 90, reason: "一個要舒服，一個要抵飲，屋企飲最實際。" }, { code: "CELL", score: 87, reason: "佢講少少酒，你慢慢享受，節奏啱啱好。" }],
    clash: { code: "VIBE", score: 41, reason: "你想靜靜飲，佢第三次叫全屋人企起身 Cheers。" },
    combo: { code: "CELL", name: "陳年慢飲結界", ability: "你令酒單學霸放鬆，酒單學霸令你杯普通酒突然多咗三層香氣。" }
  },
  DEAL: {
    good: [{ code: "SEEK", score: 93, reason: "佢肯試新嘢，你識分辨值唔值，最易執到寶。" }, { code: "HOST", score: 91, reason: "佢照顧全枱，你照顧大家個銀包。" }],
    clash: { code: "SNAP", score: 44, reason: "佢話個酒標靚到必買，你已經計緊每一啖幾錢。" },
    combo: { code: "SEEK", name: "冷門抵飲雷達", ability: "自動避開名氣溢價，仲會發現隔離枱未聽過嘅好酒。" }
  },
  GIFT: {
    good: [{ code: "CELL", score: 92, reason: "佢把關質素，你把關體面，基本上唔會送錯。" }, { code: "SNAP", score: 90, reason: "你諗場合，佢睇賣相，開盒一刻已經贏。" }],
    clash: { code: "SEEK", score: 48, reason: "佢愈冷門愈興奮，你愈驚收禮人完全唔識。" },
    combo: { code: "SNAP", name: "人情世故濾鏡", ability: "無論見家長、見客定上司生日，都會自動生成一支『睇落好識揀』嘅酒。" }
  },
  VIBE: {
    good: [{ code: "HOST", score: 96, reason: "佢負責揀啱，你負責飲得開心，完美分工。" }, { code: "SNAP", score: 94, reason: "你帶氣氛，佢留住畫面，成晚都有內容。" }],
    clash: { code: "COZY", score: 41, reason: "佢只想安靜小酌，你已經第四次叫人碰杯。" },
    combo: { code: "HOST", name: "全枱起身 Cheers 權", ability: "主理人一拍板，你一嗌 Cheers，全枱連話戒酒嗰個都會拎起杯。" }
  },
  LAY: {
    good: [{ code: "GIFT", score: 95, reason: "你負責酒後吐真情，佢負責遞水、搵紙巾同安全送你走。" }, { code: "COZY", score: 92, reason: "佢陪你慢慢飲，你自然冇咁快要瞓低。" }],
    clash: { code: "VIBE", score: 35, reason: "你已經想抖，佢仲企喺隔籬叫緊第六次 Cheers。" },
    combo: { code: "GIFT", name: "平安送返屋企模式", ability: "你負責講出收埋三年嘅心底話，佢負責記低你個袋、電話同住址。第二朝醒返，人同物都齊。" }
  }
};

// Inventory-backed mainstream grape pool. Each answer changes the final taste
// scores, so the three displayed grapes can vary even within the same VBTI type.
const GRAPE_PROFILES = [
  { name: "Pinot Noir", family: "light-red", body: 42, fresh: 72, tannin: 30, sweet: 15, aroma: 70, discovery: 45, social: 62, control: 52, value: 45, care: 68, flavor: { citrus: 18, tree: 20, stone: 28, tropical: 8, redfruit: 95, blackfruit: 42, floral: 58, herbal: 35, spice: 48, oak: 45, earthy: 72 } },
  { name: "Pinot Grigio", family: "crisp-white", body: 28, fresh: 82, tannin: 5, sweet: 18, aroma: 48, discovery: 34, social: 78, control: 34, value: 82, care: 48, flavor: { citrus: 82, tree: 78, stone: 38, tropical: 18, redfruit: 5, blackfruit: 2, floral: 32, herbal: 42, spice: 8, oak: 5, earthy: 18 } },
  { name: "Pinot Gris", family: "aromatic-white", body: 46, fresh: 62, tannin: 5, sweet: 38, aroma: 70, discovery: 52, social: 64, control: 42, value: 58, care: 58, flavor: { citrus: 48, tree: 68, stone: 86, tropical: 48, redfruit: 8, blackfruit: 2, floral: 62, herbal: 28, spice: 35, oak: 8, earthy: 15 } },
  { name: "Chardonnay", family: "round-white", body: 64, fresh: 50, tannin: 8, sweet: 18, aroma: 66, discovery: 38, social: 62, control: 68, value: 48, care: 80, flavor: { citrus: 48, tree: 86, stone: 72, tropical: 52, redfruit: 5, blackfruit: 2, floral: 35, herbal: 20, spice: 38, oak: 78, earthy: 28 } },
  { name: "Sauvignon Blanc", family: "crisp-white", body: 32, fresh: 90, tannin: 4, sweet: 10, aroma: 84, discovery: 48, social: 76, control: 48, value: 62, care: 50, flavor: { citrus: 95, tree: 62, stone: 28, tropical: 68, redfruit: 5, blackfruit: 2, floral: 38, herbal: 98, spice: 12, oak: 4, earthy: 22 } },
  { name: "Riesling", family: "aromatic-white", body: 30, fresh: 88, tannin: 4, sweet: 52, aroma: 86, discovery: 66, social: 58, control: 46, value: 58, care: 54, flavor: { citrus: 92, tree: 88, stone: 82, tropical: 48, redfruit: 5, blackfruit: 2, floral: 78, herbal: 28, spice: 18, oak: 2, earthy: 30 } },
  { name: "Cabernet Sauvignon", family: "full-red", body: 88, fresh: 42, tannin: 90, sweet: 8, aroma: 58, discovery: 28, social: 62, control: 88, value: 38, care: 82, flavor: { citrus: 5, tree: 8, stone: 15, tropical: 5, redfruit: 62, blackfruit: 98, floral: 18, herbal: 72, spice: 68, oak: 82, earthy: 48 } },
  { name: "Merlot", family: "soft-red", body: 72, fresh: 38, tannin: 54, sweet: 14, aroma: 64, discovery: 30, social: 72, control: 62, value: 74, care: 68, flavor: { citrus: 5, tree: 10, stone: 52, tropical: 8, redfruit: 82, blackfruit: 84, floral: 20, herbal: 32, spice: 52, oak: 62, earthy: 42 } },
  { name: "Syrah / Shiraz", family: "full-red", body: 84, fresh: 44, tannin: 74, sweet: 20, aroma: 82, discovery: 52, social: 76, control: 58, value: 72, care: 50, flavor: { citrus: 5, tree: 5, stone: 18, tropical: 8, redfruit: 58, blackfruit: 98, floral: 45, herbal: 38, spice: 100, oak: 72, earthy: 58 } },
  { name: "Gamay", family: "light-red", body: 34, fresh: 78, tannin: 22, sweet: 16, aroma: 74, discovery: 82, social: 82, control: 28, value: 66, care: 40, flavor: { citrus: 22, tree: 18, stone: 28, tropical: 8, redfruit: 100, blackfruit: 38, floral: 68, herbal: 30, spice: 42, oak: 12, earthy: 35 } },
  { name: "Grenache", family: "soft-red", body: 68, fresh: 46, tannin: 42, sweet: 24, aroma: 72, discovery: 68, social: 82, control: 40, value: 72, care: 44, flavor: { citrus: 8, tree: 8, stone: 28, tropical: 12, redfruit: 95, blackfruit: 62, floral: 35, herbal: 35, spice: 82, oak: 45, earthy: 42 } },
  { name: "Moscato", family: "sweet-white", body: 24, fresh: 54, tannin: 2, sweet: 92, aroma: 94, discovery: 42, social: 88, control: 18, value: 62, care: 52, flavor: { citrus: 58, tree: 52, stone: 92, tropical: 82, redfruit: 15, blackfruit: 2, floral: 100, herbal: 18, spice: 18, oak: 2, earthy: 5 } }
];

const TYPE_GRAPE_BONUS = {
  HOST: ["Cabernet Sauvignon", "Merlot", "Syrah / Shiraz"],
  SNAP: ["Pinot Grigio", "Sauvignon Blanc", "Pinot Noir"],
  SEEK: ["Gamay", "Grenache", "Riesling"],
  CELL: ["Cabernet Sauvignon", "Pinot Noir", "Chardonnay"],
  COZY: ["Pinot Noir", "Merlot", "Riesling"],
  DEAL: ["Syrah / Shiraz", "Grenache", "Pinot Grigio"],
  GIFT: ["Chardonnay", "Pinot Noir", "Cabernet Sauvignon"],
  VIBE: ["Pinot Grigio", "Gamay", "Moscato"],
  LAY: ["Moscato", "Riesling", "Pinot Gris"]
};

const PAIR_BONUSES = {
  "CELL-CELL": { name: "酒單研討會模式", ability: "兩個人一坐低，酒單即刻變成小組功課；最後會揀到最穩嗰支，但侍應可能要返嚟三次。" },
  "COZY-COZY": { name: "靜音小酌區", ability: "電話一齊較靜音，音樂自動細聲，成晚冇人催飲，舒服度直接加倍。" },
  "DEAL-DEAL": { name: "全場格價雷達", ability: "兩個人同時見到性價比，任何名氣溢價都會被即場識破。" },
  "GIFT-GIFT": { name: "體面加倍", ability: "由酒到紙袋再到張卡都照顧好，收禮人未開酒已經覺得你哋好有心。" },
  "HOST-HOST": { name: "雙隊長輪流制", ability: "一個睇餸、一個睇人數，三十秒內完成拍板；唯一風險係兩個都想講最後一句。" },
  "LAY-LAY": { name: "互相叫車模式", ability: "未開始吐真情之前已經交換好地址同緊急聯絡人，安全感先飲落肚。" },
  "SEEK-SEEK": { name: "盲飲開荒團", ability: "酒牌最陌生嗰兩支會自動發光；今晚未必最穩，但一定有新故事。" },
  "SNAP-SNAP": { name: "九宮格填滿術", ability: "酒未開已經搵好光線、角度同封面，相簿一晚增加三十張靚相。" },
  "VIBE-VIBE": { name: "Cheers 無限 Loop", ability: "一個嗌完另一個再嗌，全枱碰杯頻率翻倍；記得中間加水。" },
  "CELL-COZY": { name: "陳年慢飲結界", ability: "酒單學霸講重點，Chill住飲控制節奏；全枱突然肯安靜十秒聞香。" },
  "CELL-DEAL": { name: "規格價格雙認證", ability: "一個驗年份產區，一個驗價錢，成功揀出有料又唔肉赤嗰支。" },
  "CELL-GIFT": { name: "零失手名酒模式", ability: "質素、場合同體面一次過過關，送錯酒嘅機率接近零。" },
  "CELL-HOST": { name: "酒單快速審批", ability: "主理人定方向，學霸做最後 QC；複雜酒單都可以一分鐘內收工。" },
  "CELL-LAY": { name: "溫柔酒量管理", ability: "學霸負責揀低負擔款，躺卡負責講真心話；今晚可以感性但唔使失控。" },
  "CELL-SEEK": { name: "冷門資料庫解鎖", ability: "探員搵新酒，學霸補背景；每支陌生酒即刻多咗一段可信故事。" },
  "CELL-SNAP": { name: "品味出片模式", ability: "一個確保支酒有內容，一個確保畫面有質感，專業同吸睛同時在線。" },
  "CELL-VIBE": { name: "知識降噪模式", ability: "學霸只講最有用嗰句，酒鬼負責即刻開飲；知識量啱啱好，氣氛唔會凍。" },
  "COZY-DEAL": { name: "屋企飲性價比 Max", ability: "最舒服嘅酒配最合理嘅價錢，連外賣都會突然覺得升級咗。" },
  "COZY-GIFT": { name: "暖心招待包", ability: "一個營造舒服氣氛，一個照顧每個細節，朋友會想下星期再上嚟。" },
  "COZY-HOST": { name: "飯局柔速模式", ability: "主理人保持流程，Chill住飲負責提醒大家慢慢嚟；成晚順但唔趕。" },
  "COZY-LAY": { name: "慢飲續命術", ability: "一個陪住慢慢飲，一個唔使追杯；躺卡清醒時間自動延長一倍。" },
  "COZY-SEEK": { name: "舒適圈微冒險", ability: "每次只試一樣新嘢，夠有驚喜又唔會令全枱飲到皺眉。" },
  "COZY-SNAP": { name: "慢活出片模式", ability: "唔使趕住擺 pose，隨手影都似週末生活照，飲酒節奏完全冇被打斷。" },
  "COZY-VIBE": { name: "音量自動平衡", ability: "酒鬼負責開場，Chill住飲負責降溫；氣氛有但鄰居唔會投訴。" },
  "DEAL-GIFT": { name: "體面唔超支", ability: "睇落有心思、飲落有質素，埋單仲守得住預算。" },
  "DEAL-HOST": { name: "全枱預算守門員", ability: "主理人照顧口味，獵人照顧銀包；冇人需要扮睇唔到張單。" },
  "DEAL-LAY": { name: "平價補水套餐", ability: "慳返嘅預算自動變成水同宵夜，躺卡第二朝復活速度加快。" },
  "DEAL-SEEK": { name: "冷門抵飲雷達", ability: "自動避開名氣溢價，五分鐘鎖定最少人識但最抵飲嗰支。" },
  "DEAL-SNAP": { name: "靚得嚟唔肉赤", ability: "酒標有樣、價錢合理，影完相飲落仲真係好飲。" },
  "DEAL-VIBE": { name: "Happy Hour 放大器", ability: "同一個預算變出更多杯數同更多笑聲，成班人都覺得今晚特別抵。" },
  "GIFT-HOST": { name: "場合零甩漏", ability: "由帶幾多支到送畀邊個都有人記住，飯局再大都唔會失禮。" },
  "GIFT-LAY": { name: "平安送返屋企模式", ability: "躺卡負責吐真情，神隊友負責記低電話、袋同地址；第二朝人同物都齊。" },
  "GIFT-SEEK": { name: "驚喜但唔嚇親", ability: "冷門得嚟有故事，特別得嚟仍然送得出手，收禮人唔使扮識。" },
  "GIFT-SNAP": { name: "開盒即出片", ability: "包裝、角度同開盒時機全部到位，禮物未飲已經完成一條 Story。" },
  "GIFT-VIBE": { name: "人情氣氛雙開", ability: "一個照顧對象，一個照顧全場；主人家開心，成枱亦即刻熱起來。" },
  "HOST-LAY": { name: "全枱照顧模式", ability: "主理人一邊控場一邊留意躺卡水杯，真心話可以講，意外就唔使有。" },
  "HOST-SEEK": { name: "今晚特別餐牌", ability: "一個確保成枱接受，一個加入少少新意；穩陣飯局即刻多個記憶點。" },
  "HOST-SNAP": { name: "上枱即主角", ability: "主理人揀啱場合，手機飲先搵啱角度；支酒一上枱就自然成為焦點。" },
  "HOST-VIBE": { name: "一拍板全枱 Cheers", ability: "主理人揀酒，酒鬼開咪；全枱人會自動放低電話舉杯。" },
  "LAY-SEEK": { name: "醉後真心探險", ability: "一個帶你試新酒，一個飲後講新秘密；今晚發現嘅唔止係葡萄品種。" },
  "LAY-SNAP": { name: "醉樣自動保密", ability: "手機飲先只保留最好睇嗰張，其餘躺卡相片自動進入不公開相簿。" },
  "LAY-VIBE": { name: "一杯變六杯警報", ability: "酒鬼每次嗌 Cheers，系統都會提醒躺卡飲水；友情保留，失控機率降低。" },
  "SEEK-SNAP": { name: "冷門打卡地圖", ability: "一個搵少人知嘅酒，一個將佢影到人人想問；冷門酒即刻有流量。" },
  "SEEK-VIBE": { name: "全酒款清場", ability: "探員乜都想試，酒鬼乜都肯飲；開咗嘅酒基本上唔會剩。" },
  "SNAP-VIBE": { name: "Story 素材無限", ability: "酒鬼製造每個乾杯位，手機飲先全部接住；成晚唔怕冇內容。" }
};

const MATCH_MATRIX = {
  "CELL-COZY": 87, "CELL-DEAL": 86, "CELL-GIFT": 92, "CELL-HOST": 42, "CELL-SEEK": 55, "CELL-SNAP": 46, "CELL-VIBE": 36,
  "COZY-DEAL": 90, "COZY-GIFT": 88, "COZY-HOST": 68, "COZY-SEEK": 64, "COZY-SNAP": 72, "COZY-VIBE": 41,
  "DEAL-GIFT": 68, "DEAL-HOST": 91, "DEAL-SEEK": 93, "DEAL-SNAP": 44, "DEAL-VIBE": 82,
  "GIFT-HOST": 84, "GIFT-SEEK": 48, "GIFT-SNAP": 90, "GIFT-VIBE": 58,
  "HOST-SEEK": 74, "HOST-SNAP": 78, "HOST-VIBE": 96,
  "SEEK-SNAP": 88, "SEEK-VIBE": 89,
  "SNAP-VIBE": 94,
  "CELL-LAY": 63, "COZY-LAY": 92, "DEAL-LAY": 74, "GIFT-LAY": 95,
  "HOST-LAY": 86, "LAY-SEEK": 66, "LAY-SNAP": 82, "LAY-VIBE": 35
};

const labels = {
  body: ["輕盈", "酒體", "飽滿"],
  fresh: ["柔和", "清爽度", "明亮"],
  tannin: ["絲滑", "單寧", "紮實"],
  sweet: ["乾身", "甜度", "甜潤"],
  aroma: ["鹹香", "香氣", "馥郁"],
  discovery: ["經典", "探索度", "冒險"]
};

const budgetProfiles = {
  300: { anchor: "HK$300", fill: "32%" },
  500: { anchor: "HK$500", fill: "48%" },
  800: { anchor: "HK$800", fill: "68%" },
  1500: { anchor: "HK$1,500", fill: "90%" }
};

let current = 0;
let answers = [];
let resultType = null;
let finalScores = null;
let finalFlavorScores = null;
let inferredBudget = null;
let characterGender = "female";
let choosing = false;
const CHARACTER_SHEETS = {
  female: "assets/vbti-characters-female-hd-2x.png",
  male: "assets/vbti-characters-male-hd-2x.png"
};
const inviterCode = new URLSearchParams(location.search).get("friend");

const $ = (id) => document.getElementById(id);
const screens = ["landing", "quiz", "result"];

function typeByCode(code) {
  return types.find((type) => type.code === code);
}

function pairKey(codeA, codeB) {
  return [codeA, codeB].sort().join("-");
}

function pairBonus(codeA, codeB) {
  return PAIR_BONUSES[pairKey(codeA, codeB)] || {
    name: "臨場互補模式",
    ability: "一個照顧酒，一個照顧人；只要肯分工，任何飯局都可以順利開場。"
  };
}

function grapeDistance(grape, scores, flavorScores, typeCode, signature) {
  const weights = { body: 1.05, fresh: 1.1, tannin: 1.05, sweet: 1.15, aroma: .8, discovery: .7, social: .45, control: .4, value: .5, care: .4 };
  let distance = Object.entries(weights).reduce((sum, [dim, weight]) => sum + Math.abs((scores[dim] || 50) - grape[dim]) * weight, 0);
  // Wine Aroma Wheel families refine the grape match without overpowering
  // structural fit such as acidity, body, tannin and sweetness.
  const flavorDistance = FLAVOR_DIMENSIONS.reduce((sum, dim) => sum + Math.abs((flavorScores[dim] || 35) - (grape.flavor?.[dim] || 20)), 0) / FLAVOR_DIMENSIONS.length;
  distance += flavorDistance * 1.35;
  if (TYPE_GRAPE_BONUS[typeCode]?.includes(grape.name)) distance -= 16;
  // Small deterministic tie-breaker lets different answer paths create more
  // variation without overpowering the professional taste match.
  distance += ((signature * (grape.name.length + 3)) % 17) - 8;
  return distance;
}

function dynamicGrapes(scores, flavorScores, type) {
  const signature = answers.reduce((sum, choice, index) => sum + (choice + 1) * (index + 5), 0);
  const ranked = GRAPE_PROFILES
    .map((grape) => ({ ...grape, fit: grapeDistance(grape, scores, flavorScores, type.code, signature) }))
    .sort((a, b) => a.fit - b.fit);
  const picks = [];
  // Keep the result useful: favour three distinct style families before using
  // a second grape from the same family.
  for (const grape of ranked) {
    if (!picks.some((pick) => pick.family === grape.family)) picks.push(grape);
    if (picks.length === 3) break;
  }
  for (const grape of ranked) {
    if (picks.length === 3) break;
    if (!picks.some((pick) => pick.name === grape.name)) picks.push(grape);
  }
  return picks.map((grape) => grape.name);
}

function topFlavorFamilies(flavorScores, limit = 3) {
  return FLAVOR_DIMENSIONS
    .map((dim) => ({ dim, score: flavorScores?.[dim] || 0, label: FLAVOR_LABELS[dim] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function dynamicGrapeReason(scores, flavorScores) {
  const signals = [];
  signals.push(scores.body >= 66 ? "偏飽滿酒體" : scores.body <= 38 ? "偏輕盈酒體" : "中等酒體");
  if (scores.fresh >= 68) signals.push("清新酸度");
  if (scores.tannin >= 68) signals.push("明顯結構");
  if (scores.tannin <= 34) signals.push("柔和低單寧");
  if (scores.sweet >= 62) signals.push("果甜易入口");
  else if (scores.sweet <= 28) signals.push("乾身口味");
  if (scores.aroma >= 70) signals.push("突出香氣");
  if (scores.discovery >= 70) signals.push("探索新口味");
  const aromas = topFlavorFamilies(flavorScores).map((item) => item.label).join("、");
  return `按你今次答案嘅${signals.slice(0, 2).join("、")}，再對照風味輪偏好嘅${aromas}配對；下次答案唔同，結果亦會跟住變。`;
}

function matchScore(codeA, codeB) {
  if (codeA === codeB) return 88;
  const key = [codeA, codeB].sort().join("-");
  return MATCH_MATRIX[key] || 70;
}

function matchVerdict(score) {
  if (score >= 93) return "飲酒天團級合拍";
  if (score >= 85) return "一坐低就自然識分工";
  if (score >= 70) return "夾到，但要有人肯讓半步";
  if (score >= 55) return "可以飲，唔好一齊揀酒";
  return "最好各自叫一杯，友情會長久啲";
}

function showScreen(id) {
  screens.forEach((name) => $(name).classList.toggle("active", name === id));
  window.scrollTo({ top: 0, behavior: matchMedia("(max-width: 650px)").matches ? "auto" : "smooth" });
}

function track(event, payload = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

function renderQuestion() {
  const q = questions[current];
  $("progress-label").textContent = `${current + 1} / ${questions.length}`;
  $("progress-bar").style.width = `${((current + 1) / questions.length) * 100}%`;
  $("progress-bar").parentElement?.setAttribute("aria-valuenow", current + 1);
  $("progress-bar").parentElement?.setAttribute("aria-valuemax", questions.length);
  $("question-kicker").textContent = q.kicker;
  const compactMobile = matchMedia("(max-width: 650px)").matches;
  if (compactMobile) window.scrollTo({ top: 0, behavior: "auto" });
  $("question-title").textContent = compactMobile ? mobileQuestionCopy[current] : q.title;
  $("question-note").textContent = q.note;
  $("question-section").textContent = `TASTE / ${String(current + 1).padStart(2, "0")}`;
  $("step-number").textContent = String(current + 1).padStart(2, "0");
  $("stage-icon").innerHTML = iconSvg(questionIcons[current], "stage-line-icon");
  $("stage-copy").textContent = stageCopies[current];
  $("progress-dots").innerHTML = questions.map((_, i) => `<span class="progress-dot ${i < current ? "done" : ""} ${i === current ? "current" : ""}"></span>`).join("");
  $("back-btn").style.visibility = current ? "visible" : "hidden";
  $("answers").innerHTML = q.answers.map((a, i) => `
    <button class="answer" data-index="${i}">
      <span class="answer-copy"><span class="answer-key">${String.fromCharCode(65 + i)}</span><span><strong>${compactMobile ? mobileAnswerCopy[current][i].map((phrase) => `<span class="answer-phrase">${phrase}</span>`).join("") : a.title}</strong><small>${a.sub}</small></span></span>
      <span class="answer-visual">${answerIconSvg(answerVisuals[current][i], "answer-line-icon")}</span>
      <i class="answer-arrow">選擇 <span>→</span></i>
    </button>`).join("");
  $("question-card").classList.remove("changing");
  void $("question-card").offsetWidth;
  $("question-card").classList.add("changing");
  document.querySelectorAll(".answer").forEach((button) => {
    button.addEventListener("click", () => chooseAnswer(Number(button.dataset.index), button));
    addTilt(button, 5);
  });
}

function addTilt(element, intensity = 6) {
  element.addEventListener("pointermove", (event) => {
    if (matchMedia("(hover: none)").matches) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    element.style.setProperty("--ry", `${(x - .5) * intensity * 2}deg`);
    element.style.setProperty("--rx", `${(.5 - y) * intensity * 2}deg`);
    element.style.setProperty("--mx", `${x * 100}%`);
    element.style.setProperty("--my", `${y * 100}%`);
  });
  element.addEventListener("pointerleave", () => {
    element.style.setProperty("--ry", "0deg");
    element.style.setProperty("--rx", "0deg");
  });
}

function chooseAnswer(index, selectedButton) {
  if (choosing) return;
  choosing = true;
  answers[current] = index;
  const selected = questions[current].answers[index];
  track("vbti_answer", { question: current + 1, answer: index + 1, budget_signal: selected.budget || undefined });
  document.querySelectorAll(".answer").forEach((button) => button.classList.add(button === selectedButton ? "selected" : "dimmed"));
  setTimeout(() => {
    choosing = false;
    if (current < questions.length - 1) {
      current += 1;
      renderQuestion();
    } else {
      calculateResult();
    }
  }, 260);
}

function calculateScores() {
  const totals = Object.fromEntries(DIMENSIONS.map((d) => [d, 0]));
  const counts = Object.fromEntries(DIMENSIONS.map((d) => [d, 0]));
  answers.forEach((choice, i) => {
    const vector = questions[i].answers[choice].v;
    Object.entries(vector).forEach(([dim, value]) => {
      totals[dim] += value;
      counts[dim] += 1;
    });
  });
  return Object.fromEntries(DIMENSIONS.map((dim) => [dim, Math.round(counts[dim] ? totals[dim] / counts[dim] : 50)]));
}

function calculateFlavorScores() {
  const totals = Object.fromEntries(FLAVOR_DIMENSIONS.map((dim) => [dim, 0]));
  const counts = Object.fromEntries(FLAVOR_DIMENSIONS.map((dim) => [dim, 0]));
  answers.forEach((choice, index) => {
    const flavorVector = questions[index]?.answers[choice]?.f || {};
    Object.entries(flavorVector).forEach(([dim, value]) => {
      if (!FLAVOR_DIMENSIONS.includes(dim)) return;
      totals[dim] += value;
      counts[dim] += 1;
    });
  });
  return Object.fromEntries(FLAVOR_DIMENSIONS.map((dim) => [dim, Math.round(counts[dim] ? totals[dim] / counts[dim] : 35)]));
}

function nearestType(scores) {
  const byCode = (code) => types.find((type) => type.code === code);
  const explicitBoost = answers.map((choice, index) => questions[index]?.answers[choice]?.typeBoost).filter(Boolean).at(-1);
  if (explicitBoost === "LAY") return byCode("LAY");
  if (explicitBoost === "VIBE") return byCode("VIBE");

  // Behaviour-first routing keeps specialist types genuinely rare and gives the
  // launch population prior practical meaning. Sensory distance handles ties.
  if (scores.control >= 65 && scores.body >= 60 && scores.tannin >= 60 && scores.sweet <= 45 && scores.discovery <= 65) return byCode("CELL");
  if (scores.social >= 75 && scores.control >= 70 && scores.care >= 50 && scores.value < 85) return byCode("HOST");
  if (scores.social >= 72 && scores.control <= 58 && scores.care < 85) return byCode("VIBE");
  if (scores.social <= 62 && scores.control >= 40 && scores.discovery <= 62 && scores.tannin <= 60) return byCode("COZY");
  if (scores.care >= 85 && scores.control >= 65) return byCode("GIFT");
  if (scores.value >= 85 && scores.control >= 60) return byCode("DEAL");
  if (scores.discovery >= 78 && scores.control <= 65) return byCode("SEEK");

  const weights = { body: 1.1, fresh: 1.1, tannin: 1.1, sweet: 1, aroma: 1, discovery: 1.15, social: .85, control: .85, value: .8, care: .8 };
  const generalists = types.filter((type) => ["SNAP", "SEEK", "DEAL", "GIFT"].includes(type.code));
  return generalists.sort((a, b) => distance(a, scores, weights) - distance(b, scores, weights))[0];
}

function distance(type, scores, weights) {
  return DIMENSIONS.reduce((sum, dim) => sum + Math.pow((type.proto[dim] - scores[dim]) * weights[dim], 2), 0);
}

function level(dim, value) {
  if (dim === "body") return value < 36 ? "輕盈" : value > 67 ? "飽滿" : "中等";
  if (dim === "fresh") return value < 36 ? "柔和" : value > 67 ? "明亮" : "平衡";
  if (dim === "tannin") return value < 36 ? "絲滑" : value > 67 ? "紮實" : "有結構";
  if (dim === "sweet") return value < 30 ? "乾身" : value > 66 ? "甜潤" : "圓潤";
  if (dim === "aroma") return value < 36 ? "鹹香" : value > 67 ? "香氣突出" : "果香型";
  return value < 36 ? "經典" : value > 67 ? "冒險" : "好奇";
}

function cellPosition(cell) {
  return `${cell[0] * 33.333}% ${cell[1] * 100}%`;
}

function renderSquadSelection(item, tone, selectedNode) {
  const type = typeByCode(item.code);
  document.querySelectorAll(".squad-node").forEach((node) => {
    const active = node === selectedNode;
    node.classList.toggle("selected", active);
    node.setAttribute("aria-pressed", String(active));
  });
  $("squad-spotlight").dataset.tone = tone;
  $("squad-relation").textContent = tone === "clash" ? "容易撞板" : item.score >= 93 ? "DRINKING DREAM TEAM" : "GOOD TEAM";
  $("squad-score").textContent = `${item.score}%`;
  $("squad-detail-name").textContent = type.name;
  $("squad-detail-summary").textContent = type.squadSummary;
  $("squad-detail-avatar").className = `squad-detail-avatar avatar-${type.code.toLowerCase()}`;
  $("squad-detail-avatar").style.backgroundImage = `url('${portraitImagePath(type)}')`;
  $("squad-detail-avatar").style.backgroundPosition = "center";
  $("squad-meter-fill").style.width = `${item.score}%`;
  $("squad-detail-reason").textContent = item.reason;
  const bonus = $("squad-bonus-preview");
  const hasBonus = tone !== "clash" && item.score >= 50;
  bonus.hidden = false;
  const comboPanel = $("combo-panel");
  comboPanel.hidden = false;
  comboPanel.dataset.mode = hasBonus ? "bonus" : "clash";
  $("combo-partner").textContent = type.name;
  if (hasBonus) {
    const combo = pairBonus(resultType.code, item.code);
    $("squad-summary-label").textContent = "組隊加成解鎖";
    $("squad-bonus-name").textContent = combo.name;
    $("combo-symbol").textContent = "＋";
    $("combo-kicker").textContent = "飲酒組隊加成 · 點上面角色可以切換";
    $("combo-action").textContent = "解鎖：";
    $("combo-name").textContent = combo.name;
    $("combo-ability").textContent = combo.ability;
  } else {
    $("squad-summary-label").textContent = "最低配對 · 唔夾重點";
    $("squad-bonus-name").textContent = "飲酒節奏比較難夾";
    $("combo-symbol").textContent = "×";
    $("combo-kicker").textContent = "最低配對分析 · 點上面角色可以切換";
    $("combo-action").textContent = "容易撞板：";
    $("combo-name").textContent = "飲酒節奏比較難夾";
    $("combo-ability").textContent = item.reason;
  }
}

function renderTeamData() {
  const data = TEAM_DATA[resultType.code];
  const squadOptions = [...data.good.map((item) => ({ ...item, tone: "good" })), { ...data.clash, tone: "clash" }];
  $("squad-self-avatar").className = `squad-self-avatar avatar-${resultType.code.toLowerCase()}`;
  $("squad-self-avatar").style.backgroundImage = `url('${portraitImagePath(resultType)}')`;
  $("squad-self-avatar").style.backgroundPosition = "center";
  $("squad-self-name").textContent = resultType.name;
  $("squad-nodes").innerHTML = squadOptions.map((item, index) => {
    const type = typeByCode(item.code);
    return `<button class="squad-node node-${index} ${item.tone}" data-index="${index}" aria-pressed="false">
      <span class="squad-node-score">${item.score}%</span>
      <span class="squad-node-avatar avatar-${type.code.toLowerCase()}" style="background-image:url('${portraitImagePath(type)}');background-position:center"></span>
      <b>${type.name}</b><small>${item.tone === "clash" ? "容易撞板" : "好拍檔"}</small>
    </button>`;
  }).join("");
  const squadNodes = [...document.querySelectorAll(".squad-node")];
  squadNodes.forEach((node) => node.addEventListener("click", () => {
    const item = squadOptions[Number(node.dataset.index)];
    renderSquadSelection(item, item.tone, node);
    track("vbti_squad_character_select", { type: resultType.code, match_type: item.code, relation: item.tone, score: item.score });
  }));
  renderSquadSelection(squadOptions[0], squadOptions[0].tone, squadNodes[0]);

  const inviter = typeByCode(inviterCode);
  const panel = $("friend-match-panel");
  if (!inviter) {
    panel.hidden = true;
    return;
  }

  const score = matchScore(inviter.code, resultType.code);
  const hasBonus = score >= 50;
  $("inviter-type-name").textContent = inviter.name;
  $("friend-result-name").textContent = resultType.name;
  $("friend-match-score").textContent = `${score}%`;
  const knownReason = data.good.find((item) => item.code === inviter.code)?.reason || (data.clash.code === inviter.code ? data.clash.reason : "你哋飲酒節奏唔完全一樣，但有人揀酒、有人帶氣氛，就一樣可以成局。早啲講清楚今晚由邊個拍板就得。");
  if (hasBonus) {
    const combo = pairBonus(inviter.code, resultType.code);
    $("friend-match-verdict").textContent = `加成解鎖：${combo.name}`;
    $("friend-match-reason").textContent = `${knownReason} ${combo.ability}`;
  } else {
    $("friend-match-verdict").textContent = "飲酒節奏比較難夾";
    $("friend-match-reason").textContent = knownReason;
  }
  panel.hidden = false;
  panel.classList.toggle("bonus-unlocked", hasBonus);
}

function calculateBudget() {
  for (let i = 0; i < answers.length; i += 1) {
    const answer = questions[i]?.answers[answers[i]];
    if (answer?.budget) return answer.budget;
  }
  return 500;
}

function noraPromptText() {
  const budget = budgetProfiles[inferredBudget] || budgetProfiles[500];
  const aromaCopy = topFlavorFamilies(finalFlavorScores).map((item) => item.label).join("、");
  return `${resultType.prompt} 按葡萄酒風味輪，我最偏好${aromaCopy}。我平時較舒服嘅單支預算係 ${budget.anchor} 左右，請先按呢個預算推薦；如果有明顯更抵飲嘅選擇，可以向下調整。`;
}

function characterSheetPath() {
  return CHARACTER_SHEETS[characterGender] || CHARACTER_SHEETS.female;
}

function portraitImagePath(type = resultType, gender = characterGender) {
  if (!type) return "";
  if (type.code === "LAY") return `assets/portraits/${gender}-lay-v19-2x.png`;
  if (type.code === "SEEK") return `assets/portraits/${gender}-seek-v19-2x.png`;
  if (type.code === "COZY") return `assets/portraits/${gender}-cozy-v20-2x.png`;
  return `assets/portraits/${gender}-${type.code.toLowerCase()}-2x.png`;
}

function applyCharacterGender(gender, shouldTrack = true) {
  if (!CHARACTER_SHEETS[gender]) return;
  characterGender = gender;
  $("result").dataset.characterGender = gender;
  document.querySelectorAll(".character-choice").forEach((button) => {
    const active = button.dataset.characterGender === gender;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (resultType) $("result").style.setProperty("--portrait-image", `url('${portraitImagePath()}')`);
  if (shouldTrack && resultType) {
    track("vbti_character_gender_select", { type: resultType.code, character_gender: gender });
    renderResult();
  }
}

function calculateResult() {
  finalScores = calculateScores();
  finalFlavorScores = calculateFlavorScores();
  resultType = nearestType(finalScores);
  inferredBudget = calculateBudget();
  renderResult();
  showScreen("result");
  track("vbti_complete", { type: resultType.code, inferred_budget: inferredBudget, ...finalScores, ...Object.fromEntries(Object.entries(finalFlavorScores).map(([key, value]) => [`flavor_${key}`, value])) });
}

function renderResult() {
  applyCharacterGender(characterGender, false);
  document.documentElement.style.setProperty("--accent", "#F2750A");
  $("result-code").textContent = `VBTI / ${resultType.code}`;
  $("result-backdrop-code").textContent = resultType.code;
  $("portrait-caption-name").textContent = resultType.name;
  $("result-name").textContent = resultType.name;
  $("result-roast").textContent = matchMedia("(max-width: 650px)").matches ? `${resultType.roast.split("。")[0]}。` : resultType.roast;
  $("result-population").textContent = `${resultType.population}%`;
  document.querySelector(".population-pill").style.setProperty("--population", `${resultType.population * 3.6}deg`);
  $("result-rarity").textContent = resultType.rarity;
  $("result-ratio").textContent = resultType.ratio;
  $("population-big").textContent = `${resultType.population}%`;
  $("population-rarity-copy").textContent = resultType.rarity;
  $("population-ratio-copy").textContent = resultType.ratio;
  $("population-why").textContent = resultType.populationWhy;
  $("result-truth").textContent = `“${resultType.truth}”`;
  $("result-scene").textContent = resultType.scene;
  $("result-match").textContent = dynamicGrapeReason(finalScores, finalFlavorScores);
  $("nora-prompt").textContent = `“${noraPromptText()}”`;
  $("result").style.setProperty("--portrait-image", `url('${portraitImagePath()}')`);
  $("result-portrait").style.backgroundPosition = "center center";
  $("result-portrait").className = `portrait character-motion avatar-${resultType.code.toLowerCase()}`;
  $("result-portrait").setAttribute("aria-label", resultType.name);
  $("result-portrait-card").className = `result-portrait-card motion-${resultType.code.toLowerCase()}`;
  $("taste-bars").innerHTML = Object.keys(labels).map((dim) => `
    <div class="taste-row">
      <b>${labels[dim][1]}</b>
      <span class="bar-track"><i style="width:${finalScores[dim]}%"></i></span>
      <small>${level(dim, finalScores[dim])}</small>
    </div>`).join("");
  const flavorLeaders = topFlavorFamilies(finalFlavorScores);
  $("flavor-wheel-chips").innerHTML = flavorLeaders.map((item) => `<span>${item.label}</span>`).join("");
  $("flavor-wheel-copy").textContent = `由你對日常飲品、食物、茶同香氣嘅選擇推算；唔需要識酒先答得準。`;
  const grapeMatches = dynamicGrapes(finalScores, finalFlavorScores, resultType);
  $("wine-lanes").innerHTML = grapeMatches.map((wine) => `<span class="wine-chip">${wine}</span>`).join("");
  $("wine-lanes").dataset.matches = grapeMatches.join("|");
  $("type-strip").innerHTML = types.map((type) => `
    <div class="mini-type avatar-${type.code.toLowerCase()} ${type.code === resultType.code ? "active" : ""}" style="background-image:url('${portraitImagePath(type)}');background-position:center" title="${type.name}">
      <span class="mini-type-name">${type.name}</span><b class="mini-type-population">${type.population}%</b>
    </div>`).join("");
  updateSocialShareLinks();
  renderTeamData();
}

function resetQuiz() {
  current = 0;
  answers = [];
  resultType = null;
  finalScores = null;
  finalFlavorScores = null;
  inferredBudget = null;
  choosing = false;
  document.documentElement.style.setProperty("--accent", "#F2750A");
  renderQuestion();
  showScreen("quiz");
  track("vbti_retake");
}

function toast(message) {
  $("toast").textContent = message;
  $("toast").classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => $("toast").classList.remove("show"), 2200);
}

function shareText() {
  const best = TEAM_DATA[resultType.code].good[0];
  const bonus = pairBonus(resultType.code, best.code);
  return `我嘅 VBTI 係「${resultType.name}」(${resultType.code})\n${resultType.truth}\n呢類飲家約佔 ${resultType.population}% — ${resultType.ratio}\n最佳飲酒拍檔：${typeByCode(best.code).name}（${best.score}% Match）\n組隊加成：${bonus.name}\n\n你都做一次，睇吓我哋飲酒夾幾多：${matchInviteUrl()}`;
}

function matchInviteUrl() {
  const url = new URL(location.href);
  url.search = "";
  url.searchParams.set("friend", resultType.code);
  url.hash = "";
  return url.toString();
}

function matchInviteText() {
  return `我係「${resultType.name}」。你做埋 VBTI，睇吓我哋飲酒夾幾多，同埋會解鎖咩組隊加成：\n${matchInviteUrl()}`;
}

function updateSocialShareLinks() {
  if (!resultType) return;
  const url = matchInviteUrl();
  const text = matchInviteText();
  const whatsapp = document.querySelector('[data-social-share="whatsapp"]');
  const facebook = document.querySelector('[data-social-share="facebook"]');
  if (whatsapp) whatsapp.href = `https://wa.me/?text=${encodeURIComponent(text)}`;
  if (facebook) facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // Fall through for browsers that expose Clipboard API but deny access.
    }
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const copied = document.execCommand("copy");
  area.remove();
  return copied;
}

async function shareResult() {
  track("vbti_share_click", { type: resultType.code });
  try {
    const canvas = await drawShareCard();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    const file = new File([blob], `VBTI-${resultType.code}-Story.png`, { type: "image/png" });
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: `我嘅 VBTI：${resultType.name}`,
        text: `我係「${resultType.name}」。你都做一次，睇吓我哋飲酒夾幾多：`,
        url: matchInviteUrl(),
        files: [file]
      });
      track("vbti_story_share_success", { type: resultType.code });
      return;
    }
  } catch (error) {
    if (error?.name === "AbortError") return;
  }
  if (navigator.share) {
    try {
      await navigator.share({ title: `我嘅 VBTI：${resultType.name}`, text: shareText(), url: matchInviteUrl() });
      track("vbti_share_success", { type: resultType.code });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  await copyText(shareText());
  toast("分享文字已複製");
}

async function shareMatchInvite() {
  track("vbti_friend_match_invite", { type: resultType.code });
  if (navigator.share) {
    try {
      await navigator.share({ title: "我哋飲酒夾唔夾？", text: matchInviteText(), url: matchInviteUrl() });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  await copyText(matchInviteText());
  toast("朋友配對連結已複製");
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 99) {
  const words = typeof Intl?.Segmenter === "function"
    ? Array.from(new Intl.Segmenter("zh-HK", { granularity: "word" }).segment(text), (part) => part.segment)
    : Array.from(text);
  let line = "";
  let lines = 0;
  for (let n = 0; n < words.length; n++) {
    const test = `${line}${words[n]}`;
    if (ctx.measureText(test).width > maxWidth && line && lines < maxLines - 1) {
      ctx.fillText(line.trim(), x, y);
      line = words[n];
      y += lineHeight;
      lines += 1;
    } else line = test;
  }
  if (lines < maxLines) ctx.fillText(line.trim(), x, y);
  return y;
}

async function drawShareCard() {
  const canvas = $("share-canvas");
  const ctx = canvas.getContext("2d");
  await document.fonts?.ready;
  const bestMatch = TEAM_DATA[resultType.code].good[0];
  const bestMatchType = typeByCode(bestMatch.code);
  const [resultImg, bestMatchImg] = await Promise.all([
    loadImage(portraitImagePath(resultType)),
    loadImage(portraitImagePath(bestMatchType))
  ]);
  const storyTaglines = {
    HOST: "酒單一到手，全枱自然聽你話。",
    SNAP: "未飲先影；支酒要靚，張相都要靚。",
    SEEK: "越冷門越想試，撞酒先係樂趣。",
    CELL: "飲之前做足功課，酒單難唔到你。",
    COZY: "舒服慢飲，一杯陪你過成晚。",
    DEAL: "最識用啱價錢，飲到超值好酒。",
    GIFT: "送酒唔會失手，包裝同口味都到位。",
    VIBE: "氣氛一到，第一個舉杯一定係你。",
    LAY: "飲到中段，開始攬住朋友講心事。"
  };
  const W = canvas.width;
  const H = canvas.height;
  const roundedCard = (x, y, w, h, radius, fill, stroke = null, width = 1) => {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); }
  };
  const drawContained = (img, x, y, w, h, pad = 0) => {
    const scale = Math.min((w - pad * 2) / img.width, (h - pad * 2) / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.save();
    ctx.globalCompositeOperation = "lighten";
    ctx.drawImage(img, x + (w - dw) / 2, y + h - dh - pad, dw, dh);
    ctx.restore();
  };
  const burst = (cx, cy, outer, inner, points, fill) => {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i += 1) {
      const angle = -Math.PI / 2 + (Math.PI * i) / points;
      const radius = i % 2 ? inner : outer;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      if (!i) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
  };

  // A bold poster backdrop with a physical-card silhouette.
  ctx.fillStyle = "#F2750A";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(31,31,31,.12)";
  for (let y = -W; y < H + W; y += 42) ctx.fillRect(0, y, W, 2);
  ctx.save();
  ctx.translate(540, 965);
  ctx.rotate(-.024);
  ctx.shadowColor = "rgba(31,31,31,.24)";
  ctx.shadowBlur = 46;
  ctx.shadowOffsetY = 28;
  roundedCard(-454, -778, 908, 1556, 56, "#F7F7F2", "#1F1F1F", 5);
  ctx.shadowColor = "transparent";

  // Header strip and deliberately oversized identity typography.
  roundedCard(-412, -734, 824, 78, 39, "#1F1F1F");
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 23px Inter, Arial";
  ctx.textAlign = "left";
  ctx.fillText("VinoBuzz  /  VBTI", -376, -684);
  ctx.textAlign = "right";
  ctx.fillText(`TYPE ${resultType.code}`, 376, -684);

  ctx.textAlign = "center";
  ctx.fillStyle = "#1F1F1F";
  ctx.font = "800 25px 'Noto Sans HK', Arial";
  ctx.fillText("我嘅飲酒人格係", 0, -572);
  ctx.font = "900 88px 'Noto Sans HK', Arial";
  wrapText(ctx, resultType.name, 0, -470, 760, 96, 2);

  // Main visual: full-body character framed like a collectible card.
  roundedCard(-340, -324, 680, 720, 330, "#1F1F1F");
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(-340, -324, 680, 720, 330);
  ctx.clip();
  ctx.fillStyle = "#1F1F1F";
  ctx.fillRect(-340, -324, 680, 720);
  drawContained(resultImg, -300, -294, 600, 674, 8);
  ctx.restore();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#1F1F1F";
  ctx.beginPath();
  ctx.roundRect(-340, -324, 680, 720, 330);
  ctx.stroke();

  // Playful stickers replace report-like content blocks.
  ctx.save();
  ctx.translate(-320, -195);
  ctx.rotate(-.16);
  burst(0, 0, 112, 84, 14, "#F2750A");
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 39px Inter, Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${resultType.population}%`, 0, -3);
  ctx.font = "800 17px 'Noto Sans HK', Arial";
  ctx.fillText("飲家同類", 0, 27);
  ctx.restore();

  ctx.save();
  ctx.translate(332, 288);
  ctx.rotate(.105);
  roundedCard(-142, -55, 284, 110, 24, "#FFFFFF", "#1F1F1F", 4);
  ctx.fillStyle = "#F2750A";
  ctx.font = "900 22px Inter, Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${bestMatch.score}% MATCH`, 0, -10);
  ctx.fillStyle = "#1F1F1F";
  ctx.font = "800 20px 'Noto Sans HK', Arial";
  ctx.fillText(bestMatchType.name, 0, 27);
  ctx.restore();

  // One short personality line, presented as a pull quote rather than a report.
  ctx.fillStyle = "#1F1F1F";
  ctx.textAlign = "center";
  ctx.font = "900 34px 'Noto Sans HK', Arial";
  wrapText(ctx, `「${storyTaglines[resultType.code]}」`, 0, 502, 750, 50, 2);

  // Tiny matching-character token adds fun and a clear friend-share cue.
  roundedCard(-382, 620, 764, 106, 28, "#F2750A");
  ctx.save();
  ctx.beginPath();
  ctx.arc(-320, 673, 42, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = "#1F1F1F";
  ctx.fillRect(-362, 631, 84, 84);
  drawContained(bestMatchImg, -357, 635, 74, 78, 0);
  ctx.restore();
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.font = "900 27px 'Noto Sans HK', Arial";
  ctx.fillText("你係邊一種？", -256, 666);
  ctx.font = "700 18px Inter, Arial";
  ctx.fillText(`revhuang.github.io/vbti-hk/?friend=${resultType.code}`, -256, 698);
  ctx.restore();

  // Loose marks outside the card make the export feel like a social poster.
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 58px Inter, Arial";
  ctx.textAlign = "center";
  ctx.fillText("✦", 84, 150);
  ctx.fillText("↗", 978, 348);
  ctx.fillText("✦", 972, 1660);
  ctx.font = "900 26px Inter, Arial";
  ctx.fillText("DRINK DIFFERENT", W / 2, 1884);
  ctx.textAlign = "left";
  return canvas;
}

async function downloadCard() {
  try {
    const canvas = await drawShareCard();
    const link = document.createElement("a");
    link.download = `VBTI-${resultType.code}-${characterGender}-Instagram-Story.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    track("vbti_card_download", { type: resultType.code });
    toast("1080×1920 IG Story 人格卡已下載");
  } catch (error) {
    toast("暫時未能製作結果卡，可以先截圖。");
  }
}

$("start-btn").addEventListener("click", () => {
  current = 0;
  answers = [];
  inferredBudget = null;
  choosing = false;
  renderQuestion();
  showScreen("quiz");
  track("vbti_start", { landing_variant: "large_mobile_visual_v42" });
});
$("back-btn").addEventListener("click", () => { if (current > 0) { choosing = false; current -= 1; renderQuestion(); } });
$("restart-btn").addEventListener("click", resetQuiz);
$("retake-btn").addEventListener("click", resetQuiz);
$("share-btn").addEventListener("click", shareResult);
$("invite-btn").addEventListener("click", shareMatchInvite);
$("match-share-btn").addEventListener("click", shareMatchInvite);
document.querySelectorAll(".character-choice").forEach((button) => button.addEventListener("click", () => applyCharacterGender(button.dataset.characterGender)));
document.querySelectorAll("[data-social-share]").forEach((control) => control.addEventListener("click", async (event) => {
  const channel = control.dataset.socialShare;
  track("vbti_social_share_click", { type: resultType?.code, channel });
  if (channel === "wechat") {
    event.preventDefault();
    await copyText(matchInviteText());
    toast("連結已複製，可以貼去 WeChat");
  }
}));
$("copy-prompt-btn").addEventListener("click", async () => {
  const noraWindow = window.open("about:blank", "_blank");
  if (noraWindow) noraWindow.opener = null;
  const copied = await copyText(noraPromptText());
  if (!copied) {
    if (noraWindow) noraWindow.close();
    toast("未能自動複製提示，請再試一次");
    return;
  }
  track("vbti_nora_prompt_copy", { type: resultType.code, inferred_budget: inferredBudget });
  toast("Nora 提示已複製，正在開啟 VinoBuzz.ai");
  if (noraWindow) noraWindow.location.replace("https://vinobuzz.ai");
  else window.location.assign("https://vinobuzz.ai");
});

const landing = $("landing");
const heroCharacters = document.querySelector(".landing-result-card");
landing.addEventListener("pointermove", (event) => {
  if (matchMedia("(hover: none)").matches) return;
  const x = (event.clientX / innerWidth - .5) * 18;
  const y = (event.clientY / innerHeight - .5) * 14;
  heroCharacters.style.transform = `translate3d(${x}px,${y}px,0) rotateY(${x / 7}deg) rotateX(${-y / 7}deg)`;
});
landing.addEventListener("pointerleave", () => { heroCharacters.style.transform = "translate3d(0,0,0)"; });

document.addEventListener("pointermove", (event) => {
  const glow = $("cursor-glow");
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
  const quizRect = $("quiz").getBoundingClientRect();
  if (event.clientY >= quizRect.top && event.clientY <= quizRect.bottom) {
    $("quiz").style.setProperty("--quiz-x", `${(event.clientX / innerWidth) * 100}%`);
    $("quiz").style.setProperty("--quiz-y", `${((event.clientY - quizRect.top) / Math.max(quizRect.height, 1)) * 100}%`);
  }
});


renderQuestion();

const inviter = typeByCode(inviterCode);
track("vbti_landing_view", { landing_variant: "large_mobile_visual_v42", invited: Boolean(inviter) });
if (inviter) {
  $("friend-invite-banner").hidden = false;
  $("friend-invite-copy").textContent = `${inviter.name} 想同你驗證飲酒合拍度`;
}

// Visual QA shortcut: append ?preview=quiz or
// ?preview=result&type=HOST&match=clash when reviewing locally.
const previewParams = new URLSearchParams(location.search);
const previewMode = previewParams.get("preview");
if (previewMode === "quiz") {
  showScreen("quiz");
} else if (previewMode === "result") {
  answers = questions.map(() => 0);
  calculateResult();
  const previewType = typeByCode(previewParams.get("type"));
  if (previewType) {
    resultType = previewType;
    renderResult();
  }
  if (previewParams.get("match") === "clash") {
    document.querySelector(".squad-node.clash")?.click();
  }
}
