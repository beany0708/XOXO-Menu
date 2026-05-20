let relevantMenuPages = [];
let currentMenuPageIndex = 0;

// Language dropdown functions
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('langDropdown');
    dropdown.classList.toggle('active');
}

function selectLanguage(lang) {
    const dropdown = document.getElementById('langDropdown');
    const currentLangSpan = document.getElementById('currentLang');
    const options = document.querySelectorAll('.lang-option');
    
    // Update active state
    options.forEach(opt => opt.classList.remove('active'));
    if (lang === 'en') {
        options[0].classList.add('active');
        currentLangSpan.textContent = 'English';
    } else {
        options[1].classList.add('active');
        currentLangSpan.textContent = '中文';
    }
    
    // Close dropdown
    dropdown.classList.remove('active');
    
    // Switch language
    switchLanguage(lang);
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

const ingredients = {
    spirits: [
        { id: 'vodka', name: 'Vodka', nameCn: '伏特加', image: '🍸' },
        { id: 'gin', name: 'Gin', nameCn: '琴酒', image: '🌿' },
        { id: 'rum', name: 'Rum', nameCn: '朗姆酒', image: '🥃' },
        { id: 'whiskey', name: 'Whiskey', nameCn: '威士忌', image: '🥃' },
        { id: 'tequila', name: 'Tequila', nameCn: '龍舌蘭', image: '🌵' },
        { id: 'bourbon', name: 'Bourbon', nameCn: '波本威士忌', image: '🥃' },
        { id: 'sake', name: 'Sake', nameCn: '清酒', image: '🍶' }
    ],
    liqueurs: [
        { id: 'blue-curacao', name: 'Blue Curaçao', nameCn: '藍柑橘酒', image: '🔵' },
        { id: 'kahlua', name: 'Kahlúa', nameCn: '咖啡利口酒', image: '☕' },
        { id: 'baileys', name: "Bailey's", nameCn: '百利甜酒', image: '🥛' },
        { id: 'triple-sec', name: 'Triple Sec', nameCn: '白橙皮酒', image: '🍊' },
        { id: 'cointreau', name: 'Cointreau', nameCn: '君度橙酒', image: '🍊' },
        { id: 'amaretto', name: 'Amaretto', nameCn: '杏仁利口酒', image: '🌰' },
        { id: 'coffee-liqueur', name: 'Coffee Liqueur', nameCn: '咖啡利口酒', image: '☕' },
        { id: 'campari', name: 'Campari', nameCn: '金巴利', image: '🔴' },
        { id: 'aperol', name: 'Aperol', nameCn: '阿佩羅', image: '🍹' },
        { id: 'midori', name: 'Midori', nameCn: '蜜瓜利口酒', image: '🍈' },
        { id: 'grenadine', name: 'Grenadine', nameCn: '石榴糖漿', image: '🌹' },
        { id: 'malibu', name: 'Malibu', nameCn: '馬里布椰子酒', image: '🥥' }
    ],
    juices: [
        { id: 'lemon-juice', name: 'Lemon Juice', nameCn: '檸檬汁', image: '🍋' },
        { id: 'orange-juice', name: 'Orange Juice', nameCn: '橙汁', image: '🍊' },
        { id: 'cranberry-juice', name: 'Cranberry Juice', nameCn: '蔓越莓汁', image: '🍒' },
        { id: 'pineapple-juice', name: 'Pineapple Juice', nameCn: '菠蘿汁', image: '🍍' },
        { id: 'peach-juice', name: 'Peach Juice', nameCn: '桃汁', image: '🍑' },
        { id: 'grapefruit', name: 'Grapefruit', nameCn: '西柚', image: '🍊' },
        { id: 'apple-juice', name: 'Apple Juice', nameCn: '蘋果汁', image: '🍏' },
        { id: 'mango-juice', name: 'Mango Juice', nameCn: '芒果汁', image: '🥭' },
        { id: 'pomegranate', name: 'Pomegranate', nameCn: '石榴', image: '🔴' }
    ],
    mixers: [
        { id: 'tonic', name: 'Tonic Water', nameCn: '湯力水', image: '💧' },
        { id: 'soda-water', name: 'Soda Water', nameCn: '蘇打水', image: '🫧' },
        { id: 'ginger-ale', name: 'Ginger Ale', nameCn: '薑汁汽水', image: '🍺' },
        { id: 'ginger-beer', name: 'Ginger Beer', nameCn: '薑啤', image: '🍺' },
        { id: 'milk', name: 'Milk', nameCn: '牛奶', image: '🥛' },
        { id: 'coconut-cream', name: 'Coconut Cream', nameCn: '椰奶', image: '🥥' },
        { id: 'syrup', name: 'Syrup', nameCn: '糖漿', image: '🍯' },
        { id: 'espresso', name: 'Espresso', nameCn: '濃縮咖啡', image: '☕' },
        { id: 'cream', name: 'Cream', nameCn: '奶油', image: '🍦' },
        { id: 'cola', name: 'Cola', nameCn: '可樂', image: '🥤' },
        { id: 'honey', name: 'Honey', nameCn: '蜂蜜', image: '🍯' }
    ],
    flavors: [
        { id: 'oolong-tea', name: 'Oolong Tea', nameCn: '烏龍茶', image: '🍵' },
        { id: 'elderflower', name: 'Elderflower', nameCn: '接骨木花', image: '🌸' },
        { id: 'passion-fruit', name: 'Passion Fruit', nameCn: '百香果', image: '🥭' },
        { id: 'lychee', name: 'Lychee', nameCn: '荔枝', image: '🫐' },
        { id: 'mint', name: 'Mint', nameCn: '薄荷', image: '🌿' },
        { id: 'butterfly-pea', name: 'Butterfly Pea', nameCn: '蝶豆花', image: '🦋' },
        { id: 'vanilla', name: 'Vanilla', nameCn: '香草', image: '🍦' },
        { id: 'rose', name: 'Rose', nameCn: '玫瑰', image: '🌹' },
        { id: 'cucumber', name: 'Cucumber', nameCn: '青瓜', image: '🥒' },
        { id: 'ginger', name: 'Ginger', nameCn: '薑', image: '🫚' }
    ]
};

const menuSources = {
    'normal-mocktail': {
        name: 'Normal Mocktail Menu',
        type: 'random',
        images: ['Normal Mocktail/25.png', 'Normal Mocktail/5.png', 'Normal Mocktail/36.png', 'Normal Mocktail/37.png']
    },
    'rainbow-menu': {
        name: 'Rainbow Menu',
        type: 'random',
        images: ['Rainbow Menu/9.png', 'Rainbow Menu/10.png', 'Rainbow Menu/17.png', 'Rainbow Menu/24.png', 'Rainbow Menu/26.png', 'Rainbow Menu/28.png', 'Rainbow Menu/41.png', 'Rainbow Menu/42.png', 'Rainbow Menu/48.png', 'Rainbow Menu/49.png', 'Rainbow Menu/59.png', 'Rainbow Menu/65.png', 'Rainbow Menu/69.png', 'Rainbow Menu/80.png', 'Rainbow Menu/95.png', 'Rainbow Menu/99.png', 'Rainbow Menu/106.png', 'Rainbow Menu/112.png', 'Rainbow Menu/118.png', 'Rainbow Menu/119.png', 'Rainbow Menu/120.png']
    },
    'other-1':   { name: 'Jebsen Menu', type: 'specific', images: ['Other Menu/1.png'] },
    'other-2':   { name: 'XOXO Beverages Menu', type: 'specific', images: ['Other Menu/2.png'] },
    'other-3':   { name: 'Withers Worldwide Menu', type: 'specific', images: ['Other Menu/3.png'] },
    'other-19':  { name: 'MongoDB Menu', type: 'specific', images: ['Other Menu/19.png'] },
    'other-23':  { name: 'Christmas Drinks Menu', type: 'specific', images: ['Other Menu/23.png'] },
    'other-29':  { name: 'Bank of China Menu', type: 'specific', images: ['Other Menu/29.png'] },
    'other-33':  { name: 'XOXO Mocktails Menu', type: 'specific', images: ['Other Menu/33.png'] },
    'other-34':  { name: 'Shangri-La Mocktails', type: 'specific', images: ['Other Menu/34.png'] },
    'other-35':  { name: 'Dior Menu', type: 'specific', images: ['Other Menu/35.png'] },
    'other-38':  { name: 'XOXO Extended Mocktails', type: 'specific', images: ['Other Menu/38.png'] },
    'other-43':  { name: 'Bloomberg Specials', type: 'specific', images: ['Other Menu/43.png'] },
    'other-47':  { name: 'Hardware Lab Menu', type: 'specific', images: ['Other Menu/47.png'] },
    'other-60':  { name: 'Proposition Menu', type: 'specific', images: ['Other Menu/60.png'] },
    'other-71':  { name: 'Bank of China Specials', type: 'specific', images: ['Other Menu/71.png'] },
    'other-86':  { name: 'Mercedes-Benz Menu', type: 'specific', images: ['Other Menu/86.png'] },
    'other-90':  { name: 'Canadian Drinks Menu', type: 'specific', images: ['Other Menu/90.png'] },
    'other-91':  { name: 'Christmas Special Menu', type: 'specific', images: ['Other Menu/91.png'] },
    'other-92':  { name: 'AWS Menu', type: 'specific', images: ['Other Menu/92.png'] },
    'other-93':  { name: 'Mercedes Summer Menu', type: 'specific', images: ['Other Menu/93.png'] },
    'other-94':  { name: 'Dentsu Menu', type: 'specific', images: ['Other Menu/94.png'] },
    'other-107': { name: 'AXA Halloween Menu', type: 'specific', images: ['Other Menu/107.png'] },
    'other-115': { name: 'Birthday Party Menu', type: 'specific', images: ['Other Menu/115.png'] },
    'other-117': { name: 'Birthday Celebration Menu', type: 'specific', images: ['Other Menu/117.png'] }
};

const cocktails = [
    { id: 1, name: 'Blue Kamikaze', ingredients: ['vodka', 'blue-curacao', 'lemon-juice', 'syrup'], description: 'A vibrant blue cocktail with bold citrus punch and striking colour.', descriptionCn: '充滿活力的藍色雞尾酒，帶有濃郁的柑橘味和醒目的色彩。', method: 'Shake vodka, blue curaçao, lemon juice, and syrup with ice. Strain into a chilled glass.', image: '🔵', category: 'cocktail', menus: ['rainbow-menu', 'other-2', 'other-19', 'other-23', 'other-29', 'other-43', 'other-47', 'other-60', 'other-71', 'other-86', 'other-92', 'other-93', 'other-94'] },
    { id: 2, name: 'Purple Rain', ingredients: ['vodka', 'blue-curacao', 'lemon-juice', 'grenadine'], description: 'A mesmerising purple cocktail with layers of citrus and berry sweetness.', descriptionCn: '迷人的紫色雞尾酒，層層疊疊的柑橘和莓果甜味。', method: 'Shake vodka, blue curaçao, lemon juice, and grenadine with ice. Strain into a chilled glass.', image: '🟣', category: 'cocktail', menus: ['rainbow-menu', 'other-19', 'other-23', 'other-29', 'other-60', 'other-71', 'other-86', 'other-92', 'other-93', 'other-94'] },
    { id: 3, name: 'Pineapeel', ingredients: ['vodka', 'pineapple-juice', 'lemon-juice', 'syrup'], description: 'A refreshing vodka cocktail with bright pineapple and citrus notes.', descriptionCn: '清爽的伏特加雞尾酒，帶有明亮的菠蘿和柑橘香調。', method: 'Shake vodka, pineapple juice, lemon juice, and ginger syrup with ice. Strain into a glass.', image: '🍍', category: 'cocktail', menus: ['rainbow-menu', 'other-1', 'other-19', 'other-29', 'other-43', 'other-47', 'other-60', 'other-71', 'other-86', 'other-92', 'other-93', 'other-94', 'other-115', 'other-117'] },
    { id: 4, name: 'Roserry', ingredients: ['gin', 'lemon-juice', 'cranberry-juice', 'syrup'], description: 'An elegant gin cocktail with rosemary-infused cranberry and citrus.', descriptionCn: '優雅的琴酒雞尾酒，融合迷迭香蔓越莓和柑橘。', method: 'Shake gin, lemon juice, cranberry juice, and simple syrup with ice. Strain into a glass.', image: '🌹', category: 'cocktail', menus: ['rainbow-menu', 'other-19', 'other-23', 'other-29', 'other-43', 'other-47', 'other-60', 'other-71', 'other-86', 'other-92', 'other-93', 'other-94', 'other-115', 'other-117'] },
    { id: 5, name: 'Lemong', ingredients: ['vodka', 'lemon-juice', 'oolong-tea', 'syrup'], description: 'A unique fusion of vodka, citrus, and aromatic oolong tea.', descriptionCn: '伏特加、柑橘和芳香烏龍茶的獨特融合。', method: 'Shake vodka, lemon juice, oolong tea, and simple syrup with ice. Strain into a glass.', image: '🍋', category: 'cocktail', menus: ['rainbow-menu', 'other-19', 'other-23', 'other-29', 'other-47', 'other-60', 'other-71', 'other-86', 'other-92', 'other-93', 'other-94'] },
    { id: 6, name: 'Pinky Gin & Tonic', ingredients: ['gin', 'tonic'], description: 'A beautiful pink twist on the classic G&T with rose-gin.', descriptionCn: '經典琴湯力的美麗粉紅變奏，加入玫瑰琴酒。', method: 'Pour gin over ice. Top with tonic water. Garnish with rose petals.', image: '🩷', category: 'cocktail', menus: ['rainbow-menu', 'other-2', 'other-19', 'other-29', 'other-47', 'other-60', 'other-71', 'other-86', 'other-92', 'other-93', 'other-94', 'other-115', 'other-117'] },
    { id: 7, name: 'Mojito', ingredients: ['rum', 'lemon-juice', 'mint', 'syrup', 'soda-water'], description: 'A refreshing Cuban classic with rum, mint, and lemon.', descriptionCn: '清爽的古巴經典，融合朗姆酒、薄荷和檸檬。', method: 'Muddle mint with syrup and lemon juice. Add rum and ice. Top with soda water.', image: '🍹', category: 'cocktail', menus: ['other-43', 'other-60'] },
    { id: 8, name: 'Old Fashioned', ingredients: ['whiskey', 'syrup'], description: 'The original cocktail — timeless and sophisticated.', descriptionCn: '原創雞尾酒——永恆而精緻。', method: 'Stir whiskey with syrup and bitters over ice. Garnish with orange peel.', image: '🥃', category: 'cocktail', menus: ['other-71'] },
    { id: 9, name: 'Whiskey Sour', ingredients: ['whiskey', 'lemon-juice'], description: 'Classic whiskey cocktail with sharp lemon and a touch of sweetness.', descriptionCn: '經典威士忌雞尾酒，帶有濃郁檸檬和一絲甜味。', method: 'Shake whiskey, lemon juice, and simple syrup with ice. Strain into glass.', image: '🥃', category: 'cocktail', menus: ['other-47'] },
    { id: 10, name: 'Rainbow Riot', ingredients: ['vodka', 'blue-curacao', 'peach-juice', 'pineapple-juice', 'grenadine', 'tonic'], description: 'A spectacular multi-layered rainbow cocktail bursting with fruity flavours.', descriptionCn: '壯觀的多層彩虹雞尾酒，充滿果香風味。', method: 'Layer vodka, blue curaçao, peach juice, pineapple juice, grenadine, and tonic over ice.', image: '🌈', category: 'cocktail', menus: ['other-86', 'other-92', 'other-93', 'other-94'] },
    { id: 11, name: 'Cucumber Martini', ingredients: ['gin', 'apple-juice', 'lemon-juice'], description: 'A crisp and refreshing martini with cucumber and apple.', descriptionCn: '清脆爽口的馬天尼，融合青瓜和蘋果。', method: 'Shake martini, cucumber, apple juice, and lemon juice with ice. Strain into a chilled glass.', image: '🥒', category: 'cocktail', menus: ['other-2'] },
    { id: 12, name: 'Long-Gin', ingredients: ['gin', 'lemon-juice', 'syrup'], description: 'A tea-gin cocktail with Longjing tea and citrus.', descriptionCn: '龍井茶琴酒雞尾酒，帶有柑橘香。', method: 'Shake Longjing tea, gin, lemon, and simple syrup with ice. Strain into glass.', image: '🍵', category: 'cocktail', menus: ['other-2'] },
    { id: 13, name: 'Bay Breeze', ingredients: ['vodka', 'orange-juice', 'pineapple-juice'], description: 'A light and tropical vodka cocktail with orange and pineapple.', descriptionCn: '清爽的熱帶伏特加雞尾酒，帶有橙和菠蘿。', method: 'Pour vodka over ice. Add orange juice and pineapple juice. Stir gently.', image: '🏖️', category: 'cocktail', menus: ['other-47'] },
    { id: 14, name: 'Melon Ball', ingredients: ['vodka', 'midori', 'orange-juice'], description: 'A sweet melon cocktail with vibrant green colour.', descriptionCn: '甜美的蜜瓜雞尾酒，帶有鮮豔的綠色。', method: 'Shake vodka, Midori, and orange juice with ice. Strain into a glass.', image: '🍈', category: 'cocktail', menus: ['other-47'] },
    { id: 15, name: 'Preflop', ingredients: ['vodka', 'whiskey', 'oolong-tea', 'lemon-juice', 'soda-water'], description: 'A bold mix of vodka, whiskey, and tea with a fizzy finish.', descriptionCn: '大膽混合伏特加、威士忌和茶，帶有氣泡收尾。', method: 'Shake vodka, whiskey, tea, and lemon juice with ice. Top with club soda.', image: '🃏', category: 'cocktail', menus: ['other-47'] },
    { id: 16, name: 'Orange Visit', ingredients: ['whiskey', 'cranberry-juice', 'orange-juice', 'elderflower'], description: 'A whiskey cocktail with cranberry, orange, and elderflower.', descriptionCn: '威士忌雞尾酒，融合蔓越莓、橙和接骨木花。', method: 'Shake whiskey, cranberry juice, orange juice, and elderflower with ice. Strain into glass.', image: '🍊', category: 'cocktail', menus: ['other-47'] },
    { id: 17, name: 'Kahlua & Milk', ingredients: ['kahlua', 'milk'], description: 'A simple and creamy coffee-flavoured drink.', descriptionCn: '簡單而香滑的咖啡風味飲品。', method: 'Pour Kahlúa over ice. Top with cold milk. Stir gently.', image: '☕', category: 'cocktail', menus: ['other-115', 'other-117'] },
    { id: 18, name: 'Aperol Spritz', ingredients: ['aperol', 'soda-water'], description: 'The iconic Italian aperitivo — bittersweet and effervescent.', descriptionCn: '標誌性的意大利開胃酒——苦甜而充滿氣泡。', method: 'Pour Aperol and prosecco over ice. Top with soda. Garnish with orange slice.', image: '🍹', category: 'cocktail', menus: ['other-115', 'other-117'] },
    { id: 19, name: 'Blueberry Sake Sunshine', ingredients: ['sake', 'lychee', 'lime-juice', 'mint', 'elderflower'], description: 'A Japanese-inspired cocktail with sake, blueberry, and elderflower.', descriptionCn: '日式靈感雞尾酒，融合清酒、藍莓和接骨木花。', method: 'Shake sake, blueberry, lime, mint, and elderflower with ice. Strain into glass.', image: '🫐', category: 'cocktail', menus: ['other-1'] },
    { id: 20, name: 'Shiraz Sour', ingredients: ['gin', 'whiskey', 'lemon-juice'], description: 'A bold sour with Shiraz gin and rye whiskey.', descriptionCn: '大膽的酸味雞尾酒，融合設拉子琴酒和黑麥威士忌。', method: 'Shake Bloody Shiraz gin, rye whiskey, and lemon juice with ice. Strain into glass.', image: '🍷', category: 'cocktail', menus: ['other-1'] },
    { id: 21, name: 'Yuzu Bliss', ingredients: ['gin', 'oolong-tea', 'lime-juice', 'soda-water'], description: 'A refreshing gin cocktail with yuzu and oolong tea.', descriptionCn: '清爽的琴酒雞尾酒，融合柚子和烏龍茶。', method: 'Shake yuzu gin, oolong tea, yuzu, and lime with ice. Top with soda.', image: '🍊', category: 'cocktail', menus: ['other-1'] },
    { id: 22, name: 'Painkiller', ingredients: ['rum', 'amaretto', 'pineapple-juice', 'orange-juice', 'coconut-cream'], description: 'A tropical rum cocktail with rich coconut and citrus.', descriptionCn: '熱帶朗姆酒雞尾酒，帶有濃郁的椰子和柑橘。', method: 'Shake dark rum, amaretto, pineapple juice, orange juice, and coconut cream with ice.', image: '🏝️', category: 'cocktail', menus: ['other-3'] },
    { id: 23, name: 'Rum Punch', ingredients: ['rum', 'orange-juice', 'pineapple-juice', 'lemon-juice', 'grenadine'], description: 'A classic party punch with rum, citrus, and grenadine layers.', descriptionCn: '經典派對賓治，融合朗姆酒、柑橘和石榴糖漿層次。', method: 'Shake rum, orange juice, pineapple juice, lemon juice, and grenadine with ice.', image: '🍹', category: 'cocktail', menus: ['other-3'] },
    { id: 24, name: 'Bushwacker', ingredients: ['rum', 'coffee-liqueur', 'amaretto', 'coconut-cream', 'milk'], description: 'A creamy tropical cocktail with rum, coffee, and coconut.', descriptionCn: '香滑的熱帶雞尾酒，融合朗姆酒、咖啡和椰子。', method: 'Blend dark rum, coffee liqueur, amaretto, coconut cream, and milk with ice.', image: '🥥', category: 'cocktail', menus: ['other-3'] },
    { id: 25, name: 'Dark N\' Stormy', ingredients: ['rum', 'ginger-beer', 'lemon-juice'], description: 'A bold rum cocktail with spicy ginger beer.', descriptionCn: '大膽的朗姆酒雞尾酒，帶有辛辣的薑啤。', method: 'Pour dark rum over ice. Top with ginger beer and squeeze of lemon.', image: '⛈️', category: 'cocktail', menus: ['other-3'] },
    { id: 26, name: 'Chocolate Espresso Martini', ingredients: ['vodka', 'coffee-liqueur'], description: 'A rich espresso martini with luxurious chocolate notes.', descriptionCn: '濃郁的濃縮咖啡馬天尼，帶有奢華的巧克力香調。', method: 'Shake vodka, crème de cacao, coffee liqueur, and chocolate with ice. Strain into glass.', image: '☕', category: 'cocktail', menus: ['other-23'] },
    { id: 27, name: 'Mint Chocolate Bliss', ingredients: ['milk'], description: 'A creamy mint chocolate cocktail — pure indulgence.', descriptionCn: '香滑的薄荷巧克力雞尾酒——純粹的享受。', method: 'Shake crème de menthe, crème de cacao, and fresh milk with ice. Strain into glass.', image: '🍫', category: 'cocktail', menus: ['other-23'] },
    { id: 28, name: 'A Mickey of Whisky', ingredients: ['whiskey', 'lemon-juice', 'syrup'], description: 'A Canadian whisky sour with maple syrup sweetness.', descriptionCn: '加拿大威士忌酸酒，帶有楓糖漿甜味。', method: 'Shake Canadian whisky, lemon juice, and maple syrup with ice. Strain into glass.', image: '🥃', category: 'cocktail', menus: ['other-90'] },
    { id: 29, name: 'Canadian Pineapple', ingredients: ['whiskey', 'triple-sec', 'pineapple-juice', 'lemon-juice', 'syrup', 'ginger-ale'], description: 'A whisky cocktail with pineapple and ginger ale.', descriptionCn: '威士忌雞尾酒，融合菠蘿和薑汁汽水。', method: 'Shake whisky, triple sec, pineapple juice, lemon juice, and maple syrup with ice. Top with ginger ale.', image: '🍍', category: 'cocktail', menus: ['other-90'] },
    { id: 30, name: 'Ginseng Sunset', ingredients: ['gin', 'triple-sec', 'cranberry-juice', 'lemon-juice', 'syrup'], description: 'A gin cocktail with cranberry and ginseng maple.', descriptionCn: '琴酒雞尾酒，融合蔓越莓和人參楓糖。', method: 'Shake gin, triple sec, cranberry juice, lemon juice, and maple syrup with ice. Strain into glass.', image: '🌅', category: 'cocktail', menus: ['other-90'] },
    { id: 31, name: 'Gin & Tonic', ingredients: ['gin', 'tonic'], description: 'The timeless classic — crisp gin with effervescent tonic.', descriptionCn: '永恆的經典——清脆的琴酒配上充滿氣泡的湯力水。', method: 'Pour gin over ice. Top with tonic water. Garnish with lime.', image: '🍸', category: 'cocktail', menus: ['other-90'] },
    { id: 32, name: 'Devil Kiss', ingredients: ['whiskey', 'kahlua', 'baileys', 'coffee-liqueur'], description: 'A dark and indulgent whiskey cocktail with coffee and chocolate.', descriptionCn: '黑暗而奢華的威士忌雞尾酒，融合咖啡和巧克力。', method: 'Shake whiskey, cacao liqueur, Baileys, and coffee with ice. Strain into glass.', image: '😈', category: 'cocktail', menus: ['other-107'] },
    { id: 33, name: 'Poison Apple', ingredients: ['gin', 'mint', 'apple-juice'], description: 'A bewitching gin cocktail with mint and green apple.', descriptionCn: '迷人的琴酒雞尾酒，融合薄荷和青蘋果。', method: 'Shake gin, mint liqueur, apple juice, and sencha with ice. Strain into glass.', image: '🍏', category: 'cocktail', menus: ['other-107'] },
    { id: 34, name: 'The Wicked Queen', ingredients: ['gin', 'tonic', 'butterfly-pea'], description: 'A mystical gin and tonic with colour-changing butterfly pea.', descriptionCn: '神秘的琴湯力，加入變色的蝶豆花。', method: 'Pour gin over ice. Add butterfly pea. Top with tonic water.', image: '👑', category: 'cocktail', menus: ['other-107'] },
    { id: 35, name: 'The Atlas', ingredients: ['whiskey', 'blue-curacao', 'pineapple-juice', 'lemon-juice', 'mint'], description: 'A signature cocktail with whiskey, blue curaçao, and tropical notes.', descriptionCn: '招牌雞尾酒，融合威士忌、藍柑橘酒和熱帶風味。', method: 'Shake whiskey, blue curaçao, melon, pineapple, lemon, and mint with ice.', image: '🗺️', category: 'cocktail', menus: ['other-19'] },
    { id: 36, name: 'Lychee Sour', ingredients: ['lychee', 'elderflower', 'lemon-juice', 'soda-water'], description: 'A delicate mocktail with lychee, elderflower, and lemon.', descriptionCn: '精緻的無酒精飲品，融合荔枝、接骨木花和檸檬。', method: 'Shake lychee, elderflower, and lemon juice with ice. Top with soda.', image: '🧋', category: 'mocktail', menus: ['normal-mocktail', 'other-33', 'other-38', 'other-91'] },
    { id: 37, name: 'Cranberry Ginger Fizz', ingredients: ['cranberry-juice', 'orange-juice', 'ginger-ale'], description: 'A sparkling mocktail with tangy cranberry and spicy ginger.', descriptionCn: '氣泡無酒精飲品，帶有酸甜蔓越莓和辛辣薑味。', method: 'Pour cranberry juice and orange juice over ice. Top with ginger ale.', image: '🍒', category: 'mocktail', menus: ['normal-mocktail', 'other-33', 'other-38'] },
    { id: 38, name: 'Passion Lemonade', ingredients: ['passion-fruit', 'lemon-juice', 'soda-water'], description: 'A tropical lemonade bursting with passion fruit flavour.', descriptionCn: '熱帶檸檬水，充滿百香果風味。', method: 'Shake passion fruit and lemon juice with ice. Top with club soda.', image: '🥭', category: 'mocktail', menus: ['normal-mocktail', 'other-1', 'other-33', 'other-38'] },
    { id: 39, name: 'Sunflower', ingredients: ['grapefruit', 'elderflower', 'lemon-juice', 'tonic'], description: 'A bright and floral mocktail with grapefruit and elderflower.', descriptionCn: '明亮而花香的無酒精飲品，融合西柚和接骨木花。', method: 'Shake grapefruit, elderflower, and lemon juice with ice. Top with tonic water.', image: '🌻', category: 'mocktail', menus: ['normal-mocktail', 'other-33', 'other-34', 'other-38', 'other-91'] },
    { id: 40, name: 'First Step', ingredients: ['grapefruit', 'orange-juice', 'lemon-juice', 'ginger-ale'], description: 'A zesty and refreshing citrus mocktail with ginger ale sparkle.', descriptionCn: '活力清爽的柑橘無酒精飲品，帶有薑汁汽水氣泡。', method: 'Shake grapefruit, orange juice, and lemon juice with ice. Top with ginger ale.', image: '👣', category: 'mocktail', menus: ['normal-mocktail', 'other-33', 'other-38'] },
    { id: 41, name: 'Fruit Punch', ingredients: ['passion-fruit', 'lemon-juice', 'orange-juice', 'pineapple-juice', 'soda-water'], description: 'A vibrant tropical punch with mixed fruit juices.', descriptionCn: '充滿活力的熱帶賓治，混合多種果汁。', method: 'Shake passion fruit, lemon juice, orange juice, and pineapple juice with ice. Top with soda.', image: '🍹', category: 'mocktail', menus: ['normal-mocktail', 'other-1', 'other-33', 'other-38'] },
    { id: 42, name: 'Virgin Bellini', ingredients: ['peach-juice', 'lemon-juice', 'soda-water'], description: 'A non-alcoholic take on the classic Bellini — peachy and sparkling.', descriptionCn: '經典貝利尼的無酒精版本——桃子風味而充滿氣泡。', method: 'Shake peach juice and lemon juice with ice. Top with soda water.', image: '🍑', category: 'mocktail', menus: ['rainbow-menu', 'other-19', 'other-29', 'other-47', 'other-71', 'other-86', 'other-92', 'other-93', 'other-94', 'other-115', 'other-117'] },
    { id: 43, name: 'Fizzy Pineapple', ingredients: ['pineapple-juice', 'lemon-juice', 'syrup', 'soda-water'], description: 'A bubbly and sweet pineapple mocktail.', descriptionCn: '氣泡甜美的菠蘿無酒精飲品。', method: 'Shake pineapple juice, lemon juice, and syrup with ice. Top with soda water.', image: '🍍', category: 'mocktail', menus: ['rainbow-menu', 'other-3', 'other-19', 'other-29', 'other-38', 'other-43', 'other-47', 'other-60', 'other-71', 'other-86', 'other-92', 'other-93', 'other-94', 'other-115', 'other-117'] },
    { id: 44, name: 'Lemon Squash', ingredients: ['lemon-juice', 'soda-water'], description: 'A simple and classic lemon soda — clean and refreshing.', descriptionCn: '簡單而經典的檸檬蘇打——清爽怒人。', method: 'Squeeze lemon juice over ice. Top with sparkling water.', image: '🍋', category: 'mocktail', menus: ['rainbow-menu', 'other-2', 'other-3', 'other-19', 'other-29', 'other-38', 'other-43', 'other-47', 'other-60', 'other-71', 'other-86', 'other-92', 'other-93', 'other-94', 'other-115', 'other-117'] },
    { id: 45, name: 'Rainbow Cola Crush', ingredients: ['peach-juice', 'grenadine'], description: 'A colourful and fizzy mocktail with peach and grenadine.', descriptionCn: '繽紛氣泡的無酒精飲品，融合桃子和石榴糖漿。', method: 'Pour peach juice and grenadine over ice. Top with Coca-Cola.', image: '🌈', category: 'mocktail', menus: ['other-86', 'other-92', 'other-93', 'other-94'] },
    { id: 46, name: 'Atomic Cat', ingredients: ['orange-juice', 'tonic'], description: 'A simple and refreshing orange tonic mocktail.', descriptionCn: '簡單清爽的橙汁湯力無酒精飲品。', method: 'Pour orange juice over ice. Top with tonic water.', image: '🐱', category: 'mocktail', menus: ['other-38'] },
    { id: 47, name: 'Tropical Burst', ingredients: ['pineapple-juice', 'coconut-cream', 'lemon-juice'], description: 'A creamy tropical mocktail with pineapple and coconut.', descriptionCn: '香滑的熱帶無酒精飲品，融合菠蘿和椰子。', method: 'Shake pineapple juice, coconut water, and lemon with ice.', image: '🌴', category: 'mocktail', menus: ['other-34'] },
    { id: 48, name: 'Tea-Chee', ingredients: ['lychee', 'lime-juice', 'oolong-tea'], description: 'A refreshing tea mocktail with lychee and oolong.', descriptionCn: '清爽的茶飲，融合荔枝和烏龍茶。', method: 'Shake lychee, lime, green tea, and oolong tea with ice.', image: '🍵', category: 'mocktail', menus: ['other-34'] },
    { id: 49, name: 'Butterfly Lady', ingredients: ['butterfly-pea', 'lychee', 'elderflower', 'lemon-juice', 'soda-water'], description: 'A stunning colour-changing mocktail with butterfly pea and lychee.', descriptionCn: '驚艷的變色無酒精飲品，融合蝶豆花和荔枝。', method: 'Shake butterfly pea, lychee, elderflower, and lemon with ice. Top with soda water.', image: '🦋', category: 'mocktail', menus: ['other-43'] },
    { id: 50, name: 'Apollo', ingredients: ['pineapple-juice', 'lime-juice', 'soda-water'], description: 'A bright and citrusy pineapple sparkling mocktail.', descriptionCn: '明亮柑橘風味的菠蘿氣泡無酒精飲品。', method: 'Shake pineapple juice and lime juice with ice. Top with sparkling water.', image: '🚀', category: 'mocktail', menus: ['other-1'] },
    { id: 51, name: 'Vampire\'s Blood Punch', ingredients: ['cranberry-juice', 'orange-juice', 'grenadine'], description: 'A spooky red punch with cranberry and grenadine.', descriptionCn: '陰森的紅色賓治，融合蔓越莓和石榴糖漿。', method: 'Pour cranberry juice, orange juice, and grenadine syrup over ice.', image: '🧛', category: 'mocktail', menus: ['other-107'] },
    { id: 52, name: 'Spooky Sangria', ingredients: ['orange-juice', 'lemon-juice', 'syrup', 'soda-water'], description: 'A non-alcoholic sangria with grape, orange, and lemon.', descriptionCn: '無酒精桑格利亞，融合葡萄、橙和檸檬。', method: 'Mix grape juice, orange juice, lemon juice, and syrup. Top with club soda.', image: '🎃', category: 'mocktail', menus: ['other-107'] },
    { id: 53, name: 'Wicked Witch Brew', ingredients: ['lime-juice', 'syrup', 'soda-water'], description: 'A mysterious green brew with lime and green apple.', descriptionCn: '神秘的綠色魔法飲品，融合青檸和青蘋果。', method: 'Shake lime juice and green apple syrup with ice. Top with club soda.', image: '🧙', category: 'mocktail', menus: ['other-107'] },
    { id: 54, name: 'Classic Margarita', ingredients: ['tequila', 'cointreau', 'lime-juice', 'syrup'], description: 'The timeless Mexican classic — tequila, citrus, and a salted rim.', descriptionCn: '永恆的墨西哥經典——龍舌蘭、柑橘和鹽邊。', method: 'Shake tequila, Cointreau, lime juice, and syrup with ice. Strain into a salt-rimmed glass.', image: '🍹', category: 'cocktail', menus: ['other-43', 'other-60', 'other-71'] },
    { id: 55, name: 'Espresso Martini', ingredients: ['vodka', 'kahlua', 'espresso', 'syrup'], description: 'The ultimate pick-me-up cocktail with rich espresso and coffee liqueur.', descriptionCn: '終極提神雞尾酒，帶有濃郁的濃縮咖啡和咖啡利口酒。', method: 'Shake vodka, Kahlúa, espresso, and syrup with ice. Strain into a chilled martini glass.', image: '☕', category: 'cocktail', menus: ['other-43', 'other-60', 'other-71', 'other-115', 'other-117'] },
    { id: 56, name: 'Negroni', ingredients: ['gin', 'campari', 'syrup'], description: 'The iconic Italian aperitivo — bold, bitter, and beautifully balanced.', descriptionCn: '標誌性的意大利開胃酒——大膽、苦涩而完美平衡。', method: 'Stir gin, Campari, and sweet vermouth over ice. Strain into a rocks glass. Garnish with orange peel.', image: '🍷', category: 'cocktail', menus: ['other-43', 'other-71', 'other-90'] },
    { id: 57, name: 'Tequila Sunrise', ingredients: ['tequila', 'orange-juice', 'grenadine'], description: 'A beautiful layered cocktail that resembles a sunrise.', descriptionCn: '美麗的分層雞尾酒，如同日出。', method: 'Pour tequila and orange juice over ice. Slowly pour grenadine to create layers.', image: '🌅', category: 'cocktail', menus: ['other-43', 'other-60'] },
    { id: 58, name: 'Bourbon Sour', ingredients: ['bourbon', 'lemon-juice', 'syrup', 'cream'], description: 'A rich whiskey sour with velvety cream and citrus.', descriptionCn: '濃郁的威士忌酸酒，帶有絲滑奶油和柑橘。', method: 'Shake bourbon, lemon juice, syrup, and cream with ice. Strain into glass.', image: '🥃', category: 'cocktail', menus: ['other-71', 'other-90'] },
    { id: 59, name: 'Moscow Mule', ingredients: ['vodka', 'ginger-beer', 'lime-juice', 'ginger'], description: 'A refreshing classic with vodka and spicy ginger beer.', descriptionCn: '清爽的經典，融合伏特加和辛辣薑啤。', method: 'Pour vodka and lime juice over ice. Top with ginger beer. Garnish with lime.', image: '🫏', category: 'cocktail', menus: ['other-43', 'other-60', 'other-90'] },
    { id: 60, name: 'Cucumber Collins', ingredients: ['gin', 'cucumber', 'lemon-juice', 'soda-water', 'syrup'], description: 'A crisp and refreshing gin cocktail with cool cucumber.', descriptionCn: '清脆清爽的琴酒雞尾酒，帶有清涼青瓜。', method: 'Muddle cucumber. Shake with gin, lemon juice, and syrup. Top with soda water.', image: '🥒', category: 'cocktail', menus: ['other-2', 'other-43'] },
    { id: 61, name: 'Honey Bee', ingredients: ['rum', 'honey', 'lemon-juice'], description: 'A smooth rum cocktail sweetened with natural honey.', descriptionCn: '順滑的朗姆酒雞尾酒，以天然蜂蜜增甜。', method: 'Shake rum, honey, and lemon juice with ice. Strain into a coupe glass.', image: '🐝', category: 'cocktail', menus: ['other-3', 'other-60'] },
    { id: 62, name: 'Vanilla Espresso', ingredients: ['vodka', 'coffee-liqueur', 'espresso', 'vanilla'], description: 'A luxurious espresso martini with warm vanilla notes.', descriptionCn: '奢華的濃縮咖啡馬天尼，帶有溫暖的香草香調。', method: 'Shake vodka, coffee liqueur, espresso, and vanilla syrup with ice. Strain into glass.', image: '☕', category: 'cocktail', menus: ['other-115', 'other-117'] },
    { id: 63, name: 'Rose Spritz', ingredients: ['gin', 'rose', 'lemon-juice', 'soda-water'], description: 'A delicate and floral gin spritz with rose essence.', descriptionCn: '精緻而花香的琴酒氣泡酒，帶有玫瑰精華。', method: 'Shake gin, rose syrup, and lemon juice with ice. Top with soda water.', image: '🌹', category: 'cocktail', menus: ['other-35', 'other-115'] },
    { id: 64, name: 'Mango Colada', ingredients: ['rum', 'mango-juice', 'coconut-cream', 'lime-juice'], description: 'A tropical frozen delight with mango and coconut.', descriptionCn: '熱帶冰凍美味，融合芒果和椰子。', method: 'Blend rum, mango juice, coconut cream, and lime juice with ice.', image: '🥭', category: 'cocktail', menus: ['other-3', 'other-34'] },
    { id: 65, name: 'Pomegranate Fizz', ingredients: ['vodka', 'pomegranate', 'lemon-juice', 'soda-water'], description: 'A vibrant and tangy pomegranate sparkling cocktail.', descriptionCn: '充滿活力而酸甜的石榴氣泡雞尾酒。', method: 'Shake vodka, pomegranate juice, and lemon juice with ice. Top with soda water.', image: '❤️', category: 'cocktail', menus: ['other-23', 'other-91'] },
    { id: 66, name: 'Cuba Libre', ingredients: ['rum', 'cola', 'lime-juice'], description: 'The classic rum and cola with a squeeze of fresh lime.', descriptionCn: '經典的朗姆酒可樂，加入新鮮青檸汁。', method: 'Pour rum over ice. Add cola and squeeze of lime. Stir gently.', image: '🇨🇺', category: 'cocktail', menus: ['other-43', 'other-60'] },
    { id: 67, name: 'Mango Lassi Mocktail', ingredients: ['mango-juice', 'milk', 'honey', 'vanilla'], description: 'A creamy mango mocktail inspired by the classic lassi.', descriptionCn: '香滑的芒果無酒精飲品，靈感來自經典拉西。', method: 'Blend mango juice, milk, honey, and vanilla with ice.', image: '🥭', category: 'mocktail', menus: ['other-34', 'other-38'] },
    { id: 68, name: 'Rose Lemonade', ingredients: ['rose', 'lemon-juice', 'soda-water', 'honey'], description: 'A fragrant and refreshing rose-scented lemonade.', descriptionCn: '芳香清爽的玫瑰檸檬水。', method: 'Shake rose water, lemon juice, and honey with ice. Top with soda water.', image: '🌹', category: 'mocktail', menus: ['other-34', 'other-35', 'other-91'] },
    { id: 69, name: 'Ginger Zinger', ingredients: ['ginger', 'lemon-juice', 'honey', 'soda-water'], description: 'A spicy and invigorating ginger mocktail with honey.', descriptionCn: '辛辣而提神的薑味無酒精飲品，加入蜂蜜。', method: 'Muddle fresh ginger. Shake with lemon juice and honey. Top with soda water.', image: '🫚', category: 'mocktail', menus: ['other-33', 'other-38'] },
    { id: 70, name: 'Cucumber Cooler', ingredients: ['cucumber', 'lime-juice', 'soda-water', 'mint'], description: 'A cool and crisp cucumber mocktail with mint.', descriptionCn: '清涼清脆的青瓜無酒精飲品，加入薄荷。', method: 'Muddle cucumber and mint. Shake with lime juice. Top with soda water.', image: '🥒', category: 'mocktail', menus: ['other-33', 'other-34'] },
    { id: 71, name: 'Pomegranate Sparkle', ingredients: ['pomegranate', 'orange-juice', 'soda-water'], description: 'A jewel-toned sparkling mocktail with pomegranate.', descriptionCn: '寶石色調的石榴氣泡無酒精飲品。', method: 'Pour pomegranate juice and orange juice over ice. Top with soda water.', image: '💎', category: 'mocktail', menus: ['other-23', 'other-91'] }
];

let currentLanguage = 'en';
let activeStrengthFilter = 'all';
let activeIngredientFilters = [];

const translations = {
    en: {
        title: "Find Your Perfect Cocktail Menu",
        question1: "What kind of taste do you prefer?",
        question2: "What is the occasion?",
        question3: "How strong would you like the cocktails?",
        question4: "Would you like to choose your desired ingredients?",
        question4Desc: "You can customize your menu by selecting specific ingredients, or skip this step to see our recommendations right away.",
        taste: {
            sweet: "Sweet & Fruity",
            refreshing: "Refreshing & Light",
            balanced: "Balanced & Smooth",
            bold: "Bold & Zesty",
            any: "Any / No preference"
        },
        occasion: {
            wedding: "Wedding / Romantic",
            corporate: "Corporate / Business",
            party: "Party / Celebration",
            casual: "Casual Gathering",
            any: "Any / No preference"
        },
        strength: {
            light: "Light & Easy",
            medium: "Medium Strength",
            strong: "A bit Stronger",
            any: "Any / No preference"
        },
        buttons: {
            next: "Next →",
            back: "← Back",
            seeMenus: "See Recommended Menus",
            optionalIngredients: "Optional Ingredients",
            restart: "🔄 Restart",
            backToQuiz: "← Back to Quiz",
            seeAllMenus: "📋 See All Menus"
        },
        progress: "Question {n} of 4",
        ingredientsTitle: "Craft Your Perfect Cocktail Menu",
        ingredientsSubtitle: "Select your favourite ingredients",
        resultsTitle: "Your Recommendations",
        menuTitle: "Your Reference Menu",
        cocktailsTitle: "Matching Cocktails from Our Menu",
        filters: {
            strength: "Filter by Strength:",
            all: "All",
            light: "Light",
            medium: "Medium",
            strong: "Strong",
            ingredients: "Filter by Ingredients:",
            clearFilters: "Clear Filters",
            showFilters: "Show Filters",
            hideFilters: "Hide Filters",
            allIngredients: "All Ingredients",
            addIngredientsHelper: "Add ingredients to filter recipes"
        },
        menuCaption: "Menu from our previous events",
        categories: {
            spirits: "Base Spirits",
            liqueurs: "Liqueurs",
            juices: "Juices",
            mixers: "Mixers",
            flavors: "Flavors & Extras",
            skipCategory: "Skip this category",
            maxSelections: "Maximum 3 selections",
            showCocktails: "Show Matching Cocktails"
        },
        modal: {
            addIngredients: "Add Ingredients",
            modalSpirits: "Spirits",
            modalLiqueurs: "Liqueurs",
            modalJuices: "Juices",
            modalMixers: "Mixers",
            modalFlavors: "Flavors & Garnishes",
            save: "Save",
            cancel: "Cancel"
        },
        recipe: {
            viewFullRecipe: "View Full Recipe",
            ingredients: "Ingredients:",
            close: "Close"
        }
    },
    zh: {
        title: "尋找到最適合你的Menu",
        question1: "您喜歡什麼口味？",
        question2: "這是什麼活動？",
        question3: "您希望飲品的酒精濃度如何？",
        question4: "您想選擇您喜歡的配料嗎？",
        question4Desc: "您可以通過選擇特定配料來定製您的菜單，或跳過此步驟直接查看我們的推薦。",
        taste: {
            sweet: "甜美果香",
            refreshing: "清爽輕盈",
            balanced: "平衡順滑",
            bold: "濃烈刺激",
            any: "任意 / 無偏好"
        },
        occasion: {
            wedding: "婚禮 / 浪漫",
            corporate: "企業 / 商務",
            party: "派對 / 慶祝",
            casual: "休閒聚會",
            any: "任意 / 無偏好"
        },
        strength: {
            light: "輕度易飲",
            medium: "中等濃度",
            strong: "稍強一些",
            any: "任意 / 無偏好"
        },
        buttons: {
            next: "下一步 →",
            back: "← 返回",
            seeMenus: "查看推薦菜單",
            optionalIngredients: "自由選擇配料",
            restart: "🔄 重新開始",
            backToQuiz: "← 返回",
            seeAllMenus: "📋 查看所有菜單"
        },
        progress: "問題 {n} / 4",
        ingredientsTitle: "定製您的完美雞尾酒菜單",
        ingredientsSubtitle: "選擇您喜歡的配料",
        resultsTitle: "您的推薦",
        menuTitle: "參考菜單",
        cocktailsTitle: "菜單中的匹配雞尾酒",
        filters: {
            strength: "按濃度篩選：",
            all: "全部",
            light: "輕度",
            medium: "中等",
            strong: "濃烈",
            ingredients: "按配料篩選：",
            clearFilters: "清除篩選",
            showFilters: "顯示篩選",
            hideFilters: "隱藏篩選",
            allIngredients: "所有配料",
            addIngredientsHelper: "添加配料以篩選食譜"
        },
        menuCaption: "過往活動的菜單參考",
        categories: {
            spirits: "基酒",
            liqueurs: "利口酒",
            juices: "果汁",
            mixers: "調配料",
            flavors: "香料及其他",
            skipCategory: "跳過此類別",
            maxSelections: "最多選擇3項",
            showCocktails: "顯示匹配雞尾酒"
        },
        modal: {
            addIngredients: "添加配料",
            modalSpirits: "烈酒",
            modalLiqueurs: "利口酒",
            modalJuices: "果汁",
            modalMixers: "調配料",
            modalFlavors: "香料及裝飾",
            save: "保存",
            cancel: "取消"
        },
        recipe: {
            viewFullRecipe: "查看完整食譜",
            ingredients: "配料：",
            close: "關閉"
        }
    }
};

let quizAnswers = {
    taste: null,
    occasion: null,
    strength: null
};

let selectedIngredients = {
    spirits: [],
    liqueurs: [],
    juices: [],
    mixers: [],
    flavors: []
};

let skippedCategories = {
    spirits: false,
    liqueurs: false,
    juices: false,
    mixers: false,
    flavors: false
};

let quizRecommendedIngredients = [];
let tempSelectedIngredients = [];

function switchLanguage(lang) {
    currentLanguage = lang;
    updateLanguage();
    
    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
}

function updateLanguage() {
    const t = translations[currentLanguage];
    
    // Update all titles
    document.querySelectorAll('[data-i18n="title"]').forEach(el => {
        el.textContent = t.title;
    });
    
    // Update progress indicators
    for (let i = 1; i <= 4; i++) {
        const progressEl = document.querySelector(`#quiz-page-${i} [data-i18n="progress"]`);
        if (progressEl) {
            progressEl.textContent = t.progress.replace('{n}', i);
        }
    }
    
    // Update questions
    document.querySelector('[data-i18n="question1"]').textContent = t.question1;
    document.querySelector('[data-i18n="question2"]').textContent = t.question2;
    document.querySelector('[data-i18n="question3"]').textContent = t.question3;
    document.querySelector('[data-i18n="question4"]').textContent = t.question4;
    document.querySelector('[data-i18n="question4-desc"]').textContent = t.question4Desc;
    
    // Update taste options
    document.querySelectorAll('[data-value="sweet"]').forEach(el => el.textContent = t.taste.sweet);
    document.querySelectorAll('[data-value="refreshing"]').forEach(el => el.textContent = t.taste.refreshing);
    document.querySelectorAll('[data-value="balanced"]').forEach(el => el.textContent = t.taste.balanced);
    document.querySelectorAll('[data-value="bold"]').forEach(el => el.textContent = t.taste.bold);
    document.querySelectorAll('[data-question="taste"][data-value="any"]').forEach(el => el.textContent = t.taste.any);
    
    // Update occasion options
    document.querySelectorAll('[data-value="wedding"]').forEach(el => el.textContent = t.occasion.wedding);
    document.querySelectorAll('[data-value="corporate"]').forEach(el => el.textContent = t.occasion.corporate);
    document.querySelectorAll('[data-value="party"]').forEach(el => el.textContent = t.occasion.party);
    document.querySelectorAll('[data-value="casual"]').forEach(el => el.textContent = t.occasion.casual);
    document.querySelectorAll('[data-question="occasion"][data-value="any"]').forEach(el => el.textContent = t.occasion.any);
    
    // Update strength options
    document.querySelectorAll('[data-value="light"]').forEach(el => el.textContent = t.strength.light);
    document.querySelectorAll('[data-value="medium"]').forEach(el => el.textContent = t.strength.medium);
    document.querySelectorAll('[data-value="strong"]').forEach(el => el.textContent = t.strength.strong);
    document.querySelectorAll('[data-question="strength"][data-value="any"]').forEach(el => el.textContent = t.strength.any);
    
    // Update buttons
    document.querySelectorAll('[data-i18n="btn-next"]').forEach(el => el.textContent = t.buttons.next);
    document.querySelectorAll('[data-i18n="btn-back"]').forEach(el => el.textContent = t.buttons.back);
    document.querySelectorAll('[data-i18n="btn-restart-quiz"]').forEach(el => el.textContent = t.buttons.restart);
    document.querySelectorAll('[data-i18n="btn-see-all-menus"]').forEach(el => el.textContent = t.buttons.seeAllMenus);
    const seenMenusBtn = document.querySelector('[data-i18n="btn-see-menus"]');
    if (seenMenusBtn) seenMenusBtn.textContent = t.buttons.seeMenus;
    const optionalBtn = document.querySelector('[data-i18n="btn-optional"]');
    if (optionalBtn) optionalBtn.textContent = t.buttons.optionalIngredients;
    const restartBtn = document.querySelector('[data-i18n="btn-restart"]');
    if (restartBtn) restartBtn.textContent = t.buttons.restart;
    const backQuizBtn = document.querySelector('[data-i18n="btn-back-quiz"]');
    if (backQuizBtn) backQuizBtn.textContent = t.buttons.backToQuiz;
    
    // Update ingredients page
    document.querySelector('[data-i18n="ingredients-title"]').textContent = t.ingredientsTitle;
    document.querySelector('[data-i18n="ingredients-subtitle"]').textContent = t.ingredientsSubtitle;
    
    // Update results page
    document.querySelector('[data-i18n="results-title"]').textContent = t.resultsTitle;
    document.querySelector('[data-i18n="menu-title"]').textContent = t.menuTitle;
    document.querySelector('[data-i18n="cocktails-title"]').textContent = t.cocktailsTitle;
    const menuCaption = document.querySelector('[data-i18n="menu-caption"]');
    if (menuCaption) menuCaption.textContent = t.menuCaption;
    
    // Update filter labels
    const filterStrength = document.querySelector('[data-i18n="filter-strength"]');
    if (filterStrength) filterStrength.textContent = t.filters.strength;
    const filterIngredients = document.querySelector('[data-i18n="filter-ingredients"]');
    if (filterIngredients) filterIngredients.textContent = t.filters.ingredients;
    const filterAll = document.querySelector('[data-i18n="filter-all"]');
    if (filterAll) filterAll.textContent = t.filters.all;
    const filterLight = document.querySelector('[data-i18n="filter-light"]');
    if (filterLight) filterLight.textContent = t.filters.light;
    const filterMedium = document.querySelector('[data-i18n="filter-medium"]');
    if (filterMedium) filterMedium.textContent = t.filters.medium;
    const filterStrong = document.querySelector('[data-i18n="filter-strong"]');
    if (filterStrong) filterStrong.textContent = t.filters.strong;
    const filterClear = document.querySelector('[data-i18n="filter-clear"]');
    if (filterClear) filterClear.textContent = t.filters.clearFilters;
    
    // Update filter toggle button text
    const filterToggleBtn = document.getElementById('filterToggleBtn');
    if (filterToggleBtn) {
        const filterSection = document.getElementById('filterSection');
        if (filterSection && filterSection.classList.contains('hidden')) {
            filterToggleBtn.innerHTML = `✏️ ${t.filters.showFilters}`;
        } else {
            filterToggleBtn.innerHTML = `✏️ ${t.filters.hideFilters}`;
        }
    }
    
    // Update category labels
    const categorySpirits = document.querySelector('[data-i18n="category-spirits"]');
    if (categorySpirits) categorySpirits.textContent = t.categories.spirits;
    const categoryLiqueurs = document.querySelector('[data-i18n="category-liqueurs"]');
    if (categoryLiqueurs) categoryLiqueurs.textContent = t.categories.liqueurs;
    const categoryJuices = document.querySelector('[data-i18n="category-juices"]');
    if (categoryJuices) categoryJuices.textContent = t.categories.juices;
    const categoryMixers = document.querySelector('[data-i18n="category-mixers"]');
    if (categoryMixers) categoryMixers.textContent = t.categories.mixers;
    const categoryFlavors = document.querySelector('[data-i18n="category-flavors"]');
    if (categoryFlavors) categoryFlavors.textContent = t.categories.flavors;
    
    document.querySelectorAll('[data-i18n="category-skip"]').forEach(el => {
        el.textContent = t.categories.skipCategory;
    });
    document.querySelectorAll('[data-i18n="category-max"]').forEach(el => {
        el.textContent = t.categories.maxSelections;
    });
    const showCocktailsBtn = document.querySelector('[data-i18n="category-show-cocktails"]');
    if (showCocktailsBtn) showCocktailsBtn.textContent = t.categories.showCocktails;
    
    // Update modal labels
    const modalTitle = document.querySelector('[data-i18n="modal-add-ingredients"]');
    if (modalTitle) modalTitle.textContent = t.modal.addIngredients;
    const modalSave = document.querySelector('[data-i18n="modal-save"]');
    if (modalSave) modalSave.textContent = t.modal.save;
    const modalCancel = document.querySelector('[data-i18n="modal-cancel"]');
    if (modalCancel) modalCancel.textContent = t.modal.cancel;
    
    // Update recipe modal labels
    const recipeClose = document.querySelector('[data-i18n="recipe-close"]');
    if (recipeClose) recipeClose.textContent = t.recipe.close;
    
    // Re-render ingredient filter buttons to update helper text and ingredient names
    renderIngredientFilterButtons();
    
    // Update existing cocktail cards text content without re-filtering
    updateCocktailCardsLanguage();
    
    // Re-render ingredients with translated names
    renderIngredients();
}

function initializeApp() {
    renderIngredients();
    createParticles();
    updateButtonState();
    updateLanguage();
}

function selectQuizOption(question, value) {
    quizAnswers[question] = value;
    console.log('Quiz answer selected:', question, '=', value);
    
    const buttons = document.querySelectorAll(`[data-question="${question}"]`);
    buttons.forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.value === value) {
            btn.classList.add('selected');
        }
    });
    
    updateQuizButton();
}

function updateQuizButton() {
    // Update Next button on page 1
    const nextBtn1 = document.getElementById('nextBtn1');
    if (nextBtn1) {
        nextBtn1.disabled = !quizAnswers.taste;
    }
    
    // Update Next button on page 2
    const nextBtn2 = document.getElementById('nextBtn2');
    if (nextBtn2) {
        nextBtn2.disabled = !quizAnswers.occasion;
    }
    
    // Update Next button on page 3
    const nextBtn3 = document.getElementById('nextBtn3');
    if (nextBtn3) {
        nextBtn3.disabled = !quizAnswers.strength;
    }
}

function goToQuizPage(pageNum) {
    console.log('Navigating to quiz page:', pageNum);
    
    // Hide all quiz pages
    const pages = ['quiz-page-1', 'quiz-page-2', 'quiz-page-3', 'quiz-page-4'];
    pages.forEach(pageId => {
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('hidden');
        }
    });
    
    // Show the requested page with animation
    const targetPage = document.getElementById(`quiz-page-${pageNum}`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        
        // Re-trigger fade-in animation
        targetPage.style.animation = 'none';
        setTimeout(() => {
            targetPage.style.animation = '';
        }, 10);
        
        console.log('Successfully navigated to page', pageNum);
    } else {
        console.error('Target page not found:', `quiz-page-${pageNum}`);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function restartQuiz() {
    // Reset all quiz answers
    quizAnswers = {
        taste: null,
        occasion: null,
        strength: null
    };
    
    // Clear all selected options
    document.querySelectorAll('.quiz-option.selected').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Hide results and show first quiz page
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('quiz-page-1').classList.remove('hidden');
    document.getElementById('quiz-page-2').classList.add('hidden');
    document.getElementById('quiz-page-3').classList.add('hidden');
    document.getElementById('quiz-page-4').classList.add('hidden');
    
    // Reset buttons
    updateQuizButton();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function enlargeMenuImage() {
    const menuImage = document.getElementById('menuImage');
    const enlargedImage = document.getElementById('enlargedImage');
    const modal = document.getElementById('imageModal');
    
    enlargedImage.src = menuImage.src;
    modal.classList.add('active');
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
}

function showRecommendedMenus() {
    const matchedCocktails = getQuizRecommendedCocktails();
    const bestMenu = selectBestMenu(matchedCocktails);
    
    // Derive recommended ingredients from quiz answers and selected ingredients
    quizRecommendedIngredients = [];
    
    // First, add any manually selected ingredients from optional ingredients page
    Object.keys(selectedIngredients).forEach(category => {
        quizRecommendedIngredients = quizRecommendedIngredients.concat(selectedIngredients[category]);
    });
    
    // If no ingredients were manually selected, derive from quiz answers
    if (quizRecommendedIngredients.length === 0) {
        const recommendedIngredients = [];
        
        // Based on taste preference
        if (quizAnswers.taste === 'sweet') {
            recommendedIngredients.push('grenadine', 'peach-juice', 'mango-juice', 'pineapple-juice', 'malibu');
        } else if (quizAnswers.taste === 'refreshing') {
            recommendedIngredients.push('lemon-juice', 'mint', 'cucumber', 'soda-water', 'ginger-ale');
        } else if (quizAnswers.taste === 'balanced') {
            recommendedIngredients.push('orange-juice', 'lemon-juice', 'syrup', 'triple-sec');
        } else if (quizAnswers.taste === 'bold') {
            recommendedIngredients.push('ginger-beer', 'campari', 'lemon-juice', 'ginger');
        }
        
        // Based on strength preference
        if (quizAnswers.strength === 'light') {
            recommendedIngredients.push('sake', 'aperol', 'elderflower');
        } else if (quizAnswers.strength === 'medium') {
            recommendedIngredients.push('vodka', 'gin', 'rum');
        } else if (quizAnswers.strength === 'strong') {
            recommendedIngredients.push('whiskey', 'bourbon', 'tequila');
        }
        
        // Based on occasion
        if (quizAnswers.occasion === 'wedding') {
            recommendedIngredients.push('aperol', 'elderflower', 'rose', 'passion-fruit');
        } else if (quizAnswers.occasion === 'party') {
            recommendedIngredients.push('vodka', 'rum', 'tequila', 'lemon-juice');
        }
        
        // Remove duplicates and set as recommended
        quizRecommendedIngredients = [...new Set(recommendedIngredients)];
    }
    
    renderSelectedTags([]);
    renderMenuImage(bestMenu);
    renderCocktails(matchedCocktails);
    
    // Show filter toggle button and filter section for recommendation page
    const filterToggleBtn = document.getElementById('filterToggleBtn');
    if (filterToggleBtn) {
        filterToggleBtn.style.display = 'block';
        filterToggleBtn.innerHTML = `✏️ ${translations[currentLanguage].filters.showFilters}`;
    }
    
    // Keep filter section hidden by default, but render ingredient buttons so they're ready when user clicks Show Filters
    document.getElementById('filterSection').classList.add('hidden');
    renderIngredientFilterButtons();
    
    // Hide all quiz pages
    document.getElementById('quiz-page-1').classList.add('hidden');
    document.getElementById('quiz-page-2').classList.add('hidden');
    document.getElementById('quiz-page-3').classList.add('hidden');
    document.getElementById('quiz-page-4').classList.add('hidden');
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
    document.getElementById('step2').scrollIntoView({ behavior: 'smooth' });
}

function getQuizRecommendedCocktails() {
    let filteredCocktails = [...cocktails];
    
    if (quizAnswers.taste !== 'any') {
        filteredCocktails = filteredCocktails.filter(c => {
            const ingredients = c.ingredients.join(',');
            switch(quizAnswers.taste) {
                case 'sweet':
                    return ingredients.includes('grenadine') || ingredients.includes('peach') || 
                           ingredients.includes('mango') || ingredients.includes('pineapple') ||
                           c.name.toLowerCase().includes('sweet');
                case 'refreshing':
                    return ingredients.includes('lemon') || ingredients.includes('mint') || 
                           ingredients.includes('cucumber') || ingredients.includes('soda-water') ||
                           c.name.toLowerCase().includes('mojito') || c.name.toLowerCase().includes('spritz');
                case 'balanced':
                    return c.category === 'cocktail' && !c.name.toLowerCase().includes('sour');
                case 'bold':
                    return ingredients.includes('ginger') || ingredients.includes('campari') ||
                           c.name.toLowerCase().includes('sour') || c.name.toLowerCase().includes('negroni');
                default:
                    return true;
            }
        });
    }
    
    if (quizAnswers.strength !== 'any') {
        filteredCocktails = filteredCocktails.filter(c => {
            switch(quizAnswers.strength) {
                case 'light':
                    return c.category === 'mocktail' || c.ingredients.includes('sake');
                case 'medium':
                    return c.category === 'cocktail' && (c.ingredients.includes('vodka') || 
                           c.ingredients.includes('gin') || c.ingredients.includes('rum'));
                case 'strong':
                    return c.category === 'cocktail' && (c.ingredients.includes('whiskey') || 
                           c.ingredients.includes('bourbon') || c.ingredients.includes('tequila'));
                default:
                    return true;
            }
        });
    }
    
    return filteredCocktails.map(cocktail => ({
        ...cocktail,
        matchScore: 100,
        matchedIngredients: cocktail.ingredients
    })).slice(0, 20);
}

function showIngredientSelection() {
    // Hide all quiz pages
    document.getElementById('quiz-page-1').classList.add('hidden');
    document.getElementById('quiz-page-2').classList.add('hidden');
    document.getElementById('quiz-page-3').classList.add('hidden');
    document.getElementById('quiz-page-4').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
    document.getElementById('step1').scrollIntoView({ behavior: 'smooth' });
}

function backToQuiz() {
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('quiz-page-4').classList.remove('hidden');
    document.getElementById('quiz-page-4').scrollIntoView({ behavior: 'smooth' });
}

function getCocktailStrength(cocktail) {
    // Mocktails are always light
    if (cocktail.category === 'mocktail') return 'light';
    
    // Check for strong spirits
    const strongSpirits = ['whiskey', 'bourbon', 'tequila', 'rum'];
    const mediumSpirits = ['vodka', 'gin'];
    
    const hasStrongSpirit = cocktail.ingredients.some(ing => strongSpirits.includes(ing));
    const hasMediumSpirit = cocktail.ingredients.some(ing => mediumSpirits.includes(ing));
    
    // If has strong spirit and few mixers, it's strong
    if (hasStrongSpirit && cocktail.ingredients.length <= 3) return 'strong';
    if (hasStrongSpirit) return 'medium';
    
    // Vodka/gin with many mixers is light
    if (hasMediumSpirit && cocktail.ingredients.length >= 4) return 'light';
    if (hasMediumSpirit) return 'medium';
    
    return 'light';
}

function filterCocktailsByStrength(strength) {
    activeStrengthFilter = strength;
    renderFilteredCocktails();
}

function toggleIngredientFilter(ingredientId) {
    const index = activeIngredientFilters.indexOf(ingredientId);
    if (index > -1) {
        activeIngredientFilters.splice(index, 1);
    } else {
        activeIngredientFilters.push(ingredientId);
    }
    renderFilteredCocktails();
    renderIngredientFilterButtons();
}

function removeIngredientFilter(ingredientId) {
    // Remove from quiz-recommended ingredients
    const quizIndex = quizRecommendedIngredients.indexOf(ingredientId);
    if (quizIndex > -1) {
        quizRecommendedIngredients.splice(quizIndex, 1);
    }
    
    // Remove from active filters
    const activeIndex = activeIngredientFilters.indexOf(ingredientId);
    if (activeIndex > -1) {
        activeIngredientFilters.splice(activeIndex, 1);
    }
    
    renderFilteredCocktails();
    renderIngredientFilterButtons();
}

function clearAllFilters() {
    activeStrengthFilter = 'all';
    activeIngredientFilters = [];
    quizRecommendedIngredients = [];
    renderFilteredCocktails();
    renderIngredientFilterButtons();
    updateFilterButtonStates();
}

function renderFilteredCocktails() {
    let filteredCocktails = cocktails;
    
    // Filter by strength
    if (activeStrengthFilter !== 'all') {
        filteredCocktails = filteredCocktails.filter(c => getCocktailStrength(c) === activeStrengthFilter);
    }
    
    // Filter by ingredients (combine quiz-recommended and active filters)
    const allSelectedIngredients = [...new Set([...quizRecommendedIngredients, ...activeIngredientFilters])];
    if (allSelectedIngredients.length > 0) {
        filteredCocktails = filteredCocktails.filter(cocktail => {
            return allSelectedIngredients.every(ing => cocktail.ingredients.includes(ing));
        });
    }
    
    // Filter menus based on filtered cocktails
    const filteredCocktailIds = new Set(filteredCocktails.map(c => c.id));
    const relevantMenuKeys = new Set();
    
    // Find which menus contain the filtered cocktails
    filteredCocktails.forEach(cocktail => {
        if (cocktail.menus) {
            cocktail.menus.forEach(menuKey => relevantMenuKeys.add(menuKey));
        }
    });
    
    // Build filtered menu pages
    const filteredMenuPages = [];
    relevantMenuKeys.forEach(menuKey => {
        const menuSource = menuSources[menuKey];
        if (menuSource) {
            menuSource.images.forEach(imageUrl => {
                filteredMenuPages.push({
                    id: menuKey,
                    name: menuSource.name,
                    imageUrl: imageUrl,
                    type: menuSource.type
                });
            });
        }
    });
    
    // Update displayed menus
    if (filteredMenuPages.length > 0) {
        relevantMenuPages = filteredMenuPages;
        currentMenuPageIndex = 0;
        displayCurrentMenuPage();
    } else {
        // No menus match, display message in menu area
        relevantMenuPages = [];
        const menuImageContainer = document.getElementById('menuImageContainer');
        if (menuImageContainer) {
            menuImageContainer.innerHTML = '<p class="text-center gold-text-light">No Menu matches your filters</p>';
        }
        const pageIndicator = document.getElementById('menuPageIndicator');
        if (pageIndicator) pageIndicator.textContent = '';
    }
    
    // Render cocktails
    const cocktailsGrid = document.getElementById('cocktailsGrid');
    cocktailsGrid.innerHTML = '';
    
    if (filteredCocktails.length === 0) {
        cocktailsGrid.innerHTML = '<p class="text-center gold-text-light col-span-2">No cocktails match your filters</p>';
        return;
    }
    
    const allIngredients = [...ingredients.spirits, ...ingredients.liqueurs, ...ingredients.juices, ...ingredients.mixers, ...ingredients.flavors];
    
    filteredCocktails.forEach(cocktail => {
        const card = document.createElement('div');
        card.className = 'cocktail-card bg-card border-2 border-gray-700 rounded-lg overflow-hidden fade-in';
        
        const ingredientsList = cocktail.ingredients.map(ingId => {
            const ingredient = allIngredients.find(i => i.id === ingId);
            const displayName = ingredient ? (currentLanguage === 'zh' ? ingredient.nameCn : ingredient.name) : ingId;
            return `<span class="gold-text">${displayName}</span>`;
        }).join(', ');
        
        card.innerHTML = `
            <div class="cocktail-image bg-gradient-to-br from-gray-800 to-gray-900 h-40 flex items-center justify-center relative">
                <div class="text-6xl">${cocktail.image}</div>
                <div class="absolute top-3 right-3 bg-dark border-2 border-gold px-3 py-1 rounded-full">
                    <span class="match-score text-lg font-bold">100%</span>
                </div>
            </div>
            <div class="p-5">
                <h3 class="text-xl font-bold gold-text mb-2">${cocktail.name}</h3>
                <p class="text-gray-300 mb-3 text-sm leading-relaxed">${currentLanguage === 'zh' ? cocktail.descriptionCn : cocktail.description}</p>
                <div class="mb-4">
                    <p class="text-xs text-gray-500 mb-2 uppercase tracking-wide">${translations[currentLanguage].recipe.ingredients}</p>
                    <p class="text-sm leading-relaxed">${ingredientsList}</p>
                </div>
                <button class="btn-gold w-full py-2.5 rounded-lg text-sm font-semibold" onclick="showRecipe(${cocktail.id})">
                    ${translations[currentLanguage].recipe.viewFullRecipe}
                </button>
            </div>
        `;
        
        cocktailsGrid.appendChild(card);
    });
    
    // Update filter button states
    updateFilterButtonStates();
}

function updateCocktailCardsLanguage() {
    const cocktailsGrid = document.getElementById('cocktailsGrid');
    if (!cocktailsGrid) return;
    
    const cards = cocktailsGrid.querySelectorAll('.cocktail-card');
    if (cards.length === 0) return;
    
    const allIngredients = [...ingredients.spirits, ...ingredients.liqueurs, ...ingredients.juices, ...ingredients.mixers, ...ingredients.flavors];
    
    cards.forEach((card, index) => {
        // Find the cocktail data by parsing the onclick attribute of the button
        const button = card.querySelector('button[onclick^="showRecipe"]');
        if (!button) return;
        
        const onclickAttr = button.getAttribute('onclick');
        const cocktailId = parseInt(onclickAttr.match(/\d+/)[0]);
        const cocktail = cocktails.find(c => c.id === cocktailId);
        if (!cocktail) return;
        
        // Update description
        const description = card.querySelector('.text-gray-300');
        if (description) {
            description.textContent = currentLanguage === 'zh' ? cocktail.descriptionCn : cocktail.description;
        }
        
        // Update ingredients label
        const ingredientsLabel = card.querySelector('.text-xs.text-gray-500');
        if (ingredientsLabel) {
            ingredientsLabel.textContent = translations[currentLanguage].recipe.ingredients;
        }
        
        // Update ingredients list
        const ingredientsList = cocktail.ingredients.map(ingId => {
            const ingredient = allIngredients.find(i => i.id === ingId);
            const displayName = ingredient ? (currentLanguage === 'zh' ? ingredient.nameCn : ingredient.name) : ingId;
            return `<span class="gold-text">${displayName}</span>`;
        }).join(', ');
        
        const ingredientsText = card.querySelector('.text-sm.leading-relaxed');
        if (ingredientsText) {
            ingredientsText.innerHTML = ingredientsList;
        }
        
        // Update button text
        if (button) {
            button.textContent = translations[currentLanguage].recipe.viewFullRecipe;
        }
    });
}

function toggleFilterSection() {
    const filterSection = document.getElementById('filterSection');
    const toggleBtn = document.getElementById('filterToggleBtn');
    
    if (filterSection.classList.contains('hidden')) {
        filterSection.classList.remove('hidden');
        toggleBtn.innerHTML = `✏️ ${translations[currentLanguage].filters.hideFilters}`;
        renderIngredientFilterButtons();
    } else {
        filterSection.classList.add('hidden');
        toggleBtn.innerHTML = `✏️ ${translations[currentLanguage].filters.showFilters}`;
    }
}

function renderIngredientFilterButtons() {
    const container = document.getElementById('ingredientFiltersContainer');
    if (!container) return;
    
    // Get all ingredients from the ingredients object
    const allIngredients = [...ingredients.spirits, ...ingredients.liqueurs, ...ingredients.juices, ...ingredients.mixers, ...ingredients.flavors];
    
    // Create a map of ingredient ID to display info
    const ingredientMap = {};
    allIngredients.forEach(ing => {
        ingredientMap[ing.id] = {
            id: ing.id,
            emoji: ing.image,
            name: currentLanguage === 'zh' ? ing.nameCn : ing.name
        };
    });
    
    // Get selected ingredients (quiz-recommended + any additional active filters)
    const selectedIngredientIds = new Set([...quizRecommendedIngredients, ...activeIngredientFilters]);
    
    // Clear and render
    container.innerHTML = '';
    
    // If no ingredients selected, show helper text
    if (selectedIngredientIds.size === 0) {
        const helperText = document.createElement('span');
        helperText.className = 'text-sm text-gray-400 italic';
        helperText.textContent = translations[currentLanguage].filters.addIngredientsHelper;
        container.appendChild(helperText);
    } else {
        // Render selected ingredients as removable chips
        selectedIngredientIds.forEach(ingId => {
            const ing = ingredientMap[ingId];
            if (!ing) return;
            
            const chip = document.createElement('div');
            chip.className = 'inline-flex items-center gap-2 bg-gold text-dark px-3 py-1 rounded-full text-sm font-semibold';
            
            const label = document.createElement('span');
            label.textContent = `${ing.emoji} ${ing.name}`;
            
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '❌';
            removeBtn.className = 'text-xs hover:scale-110 transition-transform';
            removeBtn.onclick = () => removeIngredientFilter(ingId);
            
            chip.appendChild(label);
            chip.appendChild(removeBtn);
            container.appendChild(chip);
        });
    }
    
    // Always show "+ Add" button
    const addButton = document.createElement('button');
    addButton.className = 'inline-flex items-center gap-1 border-2 border-gold text-gold px-4 py-1 rounded-full text-sm font-semibold hover:bg-gold hover:text-dark transition-all';
    addButton.innerHTML = `➕ ${translations[currentLanguage].modal.addIngredients}`;
    addButton.onclick = () => openIngredientSelectionModal();
    container.appendChild(addButton);
}

function openIngredientSelectionModal() {
    const modal = document.getElementById('ingredientSelectionModal');
    const content = document.getElementById('ingredientSelectionContent');
    
    // Initialize temp selection with currently selected ingredients (only if modal is not already open)
    if (modal.classList.contains('hidden')) {
        tempSelectedIngredients = [...new Set([...quizRecommendedIngredients, ...activeIngredientFilters])];
    }
    
    // Render ingredient categories
    content.innerHTML = '';
    
    const t = translations[currentLanguage];
    const categories = [
        { key: 'spirits', label: t.modal.modalSpirits, items: ingredients.spirits },
        { key: 'liqueurs', label: t.modal.modalLiqueurs, items: ingredients.liqueurs },
        { key: 'juices', label: t.modal.modalJuices, items: ingredients.juices },
        { key: 'mixers', label: t.modal.modalMixers, items: ingredients.mixers },
        { key: 'flavors', label: t.modal.modalFlavors, items: ingredients.flavors }
    ];
    
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'mb-6';
        
        const categoryTitle = document.createElement('h4');
        categoryTitle.className = 'text-lg font-semibold gold-text mb-3';
        categoryTitle.textContent = category.label;
        categoryDiv.appendChild(categoryTitle);
        
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3';
        
        category.items.forEach(ing => {
            const card = document.createElement('div');
            const isSelected = tempSelectedIngredients.includes(ing.id);
            card.className = `border-2 rounded-lg p-3 cursor-pointer transition-all ${
                isSelected ? 'border-gold bg-gold bg-opacity-20' : 'border-gray-600 hover:border-gold'
            }`;
            card.dataset.ingredientId = ing.id;
            card.onclick = () => toggleTempIngredient(ing.id, card);
            
            const displayName = currentLanguage === 'zh' ? ing.nameCn : ing.name;
            card.innerHTML = `
                <div class="text-center">
                    <div class="text-3xl mb-2">${ing.image}</div>
                    <div class="text-sm ${isSelected ? 'gold-text font-semibold' : 'text-gray-300'}">${displayName}</div>
                </div>
            `;
            
            grid.appendChild(card);
        });
        
        categoryDiv.appendChild(grid);
        content.appendChild(categoryDiv);
    });
    
    // Show modal
    modal.classList.remove('hidden');
}

function closeIngredientSelectionModal() {
    const modal = document.getElementById('ingredientSelectionModal');
    modal.classList.add('hidden');
    tempSelectedIngredients = [];
}

function toggleTempIngredient(ingredientId, cardElement) {
    const index = tempSelectedIngredients.indexOf(ingredientId);
    const isNowSelected = index === -1;
    
    if (isNowSelected) {
        tempSelectedIngredients.push(ingredientId);
    } else {
        tempSelectedIngredients.splice(index, 1);
    }
    
    // Update the card's visual state directly
    if (isNowSelected) {
        cardElement.className = 'border-2 rounded-lg p-3 cursor-pointer transition-all border-gold bg-gold bg-opacity-20';
        const nameDiv = cardElement.querySelector('.text-sm');
        nameDiv.className = 'text-sm gold-text font-semibold';
        const centerDiv = cardElement.querySelector('.text-center');
        if (!centerDiv.querySelector('.text-xs')) {
            centerDiv.innerHTML += '<div class="text-xs gold-text mt-1">✓ Selected</div>';
        }
    } else {
        cardElement.className = 'border-2 rounded-lg p-3 cursor-pointer transition-all border-gray-600 hover:border-gold';
        const nameDiv = cardElement.querySelector('.text-sm');
        nameDiv.className = 'text-sm text-gray-300';
        const checkmark = cardElement.querySelector('.text-xs');
        if (checkmark) {
            checkmark.remove();
        }
    }
}

function confirmIngredientSelection() {
    // Update quiz-recommended ingredients and active filters
    quizRecommendedIngredients = [...tempSelectedIngredients];
    activeIngredientFilters = [];
    
    // Close modal
    closeIngredientSelectionModal();
    
    // Re-render filter buttons and cocktails
    renderIngredientFilterButtons();
    renderFilteredCocktails();
}

function updateFilterButtonStates() {
    // Update strength filter buttons
    document.querySelectorAll('.strength-filter-btn').forEach(btn => {
        if (btn.dataset.strength === activeStrengthFilter) {
            btn.classList.add('active-filter');
        } else {
            btn.classList.remove('active-filter');
        }
    });
    
    // Update ingredient filter buttons
    document.querySelectorAll('.ingredient-filter-btn').forEach(btn => {
        if (activeIngredientFilters.includes(btn.dataset.ingredient)) {
            btn.classList.add('active-filter');
        } else {
            btn.classList.remove('active-filter');
        }
    });
}

function showAllMenus() {
    // Hide all quiz pages and other sections
    document.getElementById('quiz-page-1').classList.add('hidden');
    document.getElementById('quiz-page-2').classList.add('hidden');
    document.getElementById('quiz-page-3').classList.add('hidden');
    document.getElementById('quiz-page-4').classList.add('hidden');
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
    
    // Build array of all menu pages from menuSources
    const allMenuPages = [];
    Object.keys(menuSources).forEach(menuKey => {
        const menuSource = menuSources[menuKey];
        menuSource.images.forEach(imageUrl => {
            allMenuPages.push({
                id: menuKey,
                name: menuSource.name,
                imageUrl: imageUrl,
                type: menuSource.type
            });
        });
    });
    
    // Display all menus
    relevantMenuPages = allMenuPages;
    currentMenuPageIndex = 0;
    displayCurrentMenuPage();
    
    // Reset filters and render all cocktails
    activeStrengthFilter = 'all';
    activeIngredientFilters = [];
    quizRecommendedIngredients = [];
    
    // Show filter toggle button for "See All Menu" page so users can filter
    const filterToggleBtn = document.getElementById('filterToggleBtn');
    if (filterToggleBtn) {
        filterToggleBtn.style.display = 'block';
        filterToggleBtn.innerHTML = `✏️ ${translations[currentLanguage].filters.showFilters}`;
    }
    
    // Keep filter section hidden by default, but render ingredient buttons so they're ready
    document.getElementById('filterSection').classList.add('hidden');
    renderIngredientFilterButtons();
    
    // Render filtered cocktails
    renderFilteredCocktails();
    
    // Update title
    const resultsTitle = document.getElementById('resultsTitle');
    resultsTitle.textContent = currentLanguage === 'zh' ? '所有菜單' : 'All Menus';
    
    // Clear selected tags
    document.getElementById('selectedTags').innerHTML = '';
    
    window.scrollTo(0, 0);
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

function renderIngredients() {
    Object.keys(ingredients).forEach(category => {
        const grid = document.getElementById(`${category}-grid`);
        grid.innerHTML = '';
        
        ingredients[category].forEach(ingredient => {
            const card = document.createElement('div');
            card.className = 'ingredient-card bg-card border-2 border-gray-700 rounded-lg p-2 hover-gold';
            card.onclick = () => toggleIngredient(category, ingredient.id);
            
            const displayName = currentLanguage === 'zh' ? ingredient.nameCn : ingredient.name;
            card.innerHTML = `
                <div class="flex flex-col items-center text-center">
                    <div class="text-3xl mb-1">${ingredient.image}</div>
                    <h3 class="text-sm font-semibold mb-1">${displayName}</h3>
                    <input type="checkbox" class="checkbox-gold" id="check-${ingredient.id}" 
                           ${selectedIngredients[category].includes(ingredient.id) ? 'checked' : ''}>
                </div>
            `;
            
            grid.appendChild(card);
        });
    });
}

function toggleCategory(category) {
    // Check if this would result in all categories being skipped
    const wouldSkip = !skippedCategories[category];
    if (wouldSkip) {
        const allCategories = ['spirits', 'liqueurs', 'juices', 'mixers', 'garnishes'];
        const currentlySkipped = allCategories.filter(cat => skippedCategories[cat]);
        
        // If this would make all categories skipped, prevent it
        if (currentlySkipped.length >= allCategories.length - 1) {
            alert('At least one category must remain active. You cannot skip all categories.');
            return;
        }
    }
    
    skippedCategories[category] = !skippedCategories[category];
    const toggle = event.currentTarget;
    toggle.classList.toggle('active');
    
    const section = document.querySelector(`[data-category="${category}"]`);
    const grid = section.querySelector('.grid');
    
    if (skippedCategories[category]) {
        grid.style.opacity = '0.3';
        grid.style.pointerEvents = 'none';
        selectedIngredients[category] = [];
    } else {
        grid.style.opacity = '1';
        grid.style.pointerEvents = 'auto';
    }
    
    renderIngredients();
    updateButtonState();
}

function toggleIngredient(category, ingredientId) {
    if (skippedCategories[category]) return;
    
    const index = selectedIngredients[category].indexOf(ingredientId);
    
    if (index > -1) {
        selectedIngredients[category].splice(index, 1);
    } else {
        if (selectedIngredients[category].length < 3) {
            selectedIngredients[category].push(ingredientId);
        } else {
            return;
        }
    }
    
    const checkbox = document.getElementById(`check-${ingredientId}`);
    checkbox.checked = !checkbox.checked;
    
    const card = checkbox.closest('.ingredient-card');
    card.classList.toggle('selected');
    
    updateButtonState();
}

function updateButtonState() {
    const button = document.getElementById('showCocktailsBtn');
    let isValid = true;
    
    Object.keys(selectedIngredients).forEach(category => {
        if (!skippedCategories[category] && selectedIngredients[category].length === 0) {
            isValid = false;
        }
    });
    
    button.disabled = !isValid;
}

function showCocktails() {
    const allSelected = [
        ...selectedIngredients.spirits,
        ...selectedIngredients.liqueurs,
        ...selectedIngredients.juices,
        ...selectedIngredients.mixers,
        ...selectedIngredients.flavors
    ];
    
    const matchedCocktails = cocktails.map(cocktail => {
        const matches = cocktail.ingredients.filter(ing => allSelected.includes(ing));
        const matchScore = Math.round((matches.length / cocktail.ingredients.length) * 100);
        
        return {
            ...cocktail,
            matchScore,
            matchedIngredients: matches
        };
    }).filter(c => c.matchScore > 0).sort((a, b) => b.matchScore - a.matchScore);
    
    const bestMenu = selectBestMenu(matchedCocktails);
    
    renderSelectedTags(allSelected);
    renderMenuImage(bestMenu);
    renderCocktails(matchedCocktails);
    
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
    document.getElementById('step2').scrollIntoView({ behavior: 'smooth' });
}

function selectBestMenu(matchedCocktails) {
    const menuScoreMap = {};
    
    matchedCocktails.forEach(cocktail => {
        if (!cocktail.menus) return;
        cocktail.menus.forEach(menuKey => {
            if (!menuScoreMap[menuKey]) menuScoreMap[menuKey] = 0;
            menuScoreMap[menuKey] += cocktail.matchScore;
        });
    });
    
    // Merge all rainbow-menu and normal-mocktail scores into single keys
    const mergedScores = {};
    Object.entries(menuScoreMap).forEach(([key, score]) => {
        const source = menuSources[key];
        if (!source) return;
        if (source.type === 'random') {
            // Aggregate score under the same key (rainbow-menu or normal-mocktail)
            mergedScores[key] = (mergedScores[key] || 0) + score;
        } else {
            mergedScores[key] = (mergedScores[key] || 0) + score;
        }
    });
    
    const scoredMenus = Object.entries(mergedScores)
        .sort((a, b) => b[1] - a[1]);
    
    if (scoredMenus.length === 0) {
        const firstKey = Object.keys(menuSources)[0];
        return [getMenuDisplay(firstKey)];
    }
    
    // Take top 5 only
    const top5 = scoredMenus.slice(0, 5);
    const results = top5.map(([menuKey]) => getMenuDisplay(menuKey));
    
    return results.length > 0 ? results : [getMenuDisplay(Object.keys(menuSources)[0])];
}

function getMenuDisplay(menuKey) {
    const source = menuSources[menuKey];
    if (!source) return { name: 'Menu', imageUrl: '' };
    
    let imageUrl;
    if (source.type === 'random') {
        const randomIndex = Math.floor(Math.random() * source.images.length);
        imageUrl = source.images[randomIndex];
    } else {
        imageUrl = source.images[0];
    }
    
    return { name: source.name, imageUrl };
}

function renderMenuImage(menus) {
    relevantMenuPages = Array.isArray(menus) ? menus : [menus];
    currentMenuPageIndex = 0;
    displayCurrentMenuPage();
}

function renderSelectedTags(selected) {
    const container = document.getElementById('selectedTags');
    container.innerHTML = '';
    
    const allIngredients = [...ingredients.spirits, ...ingredients.liqueurs, ...ingredients.juices, ...ingredients.mixers, ...ingredients.flavors];
    
    selected.forEach(id => {
        const ingredient = allIngredients.find(ing => ing.id === id);
        if (ingredient) {
            const tag = document.createElement('span');
            tag.className = 'ingredient-tag';
            tag.textContent = currentLanguage === 'zh' ? ingredient.nameCn : ingredient.name;
            container.appendChild(tag);
        }
    });
}

function renderCocktails(matchedCocktails) {
    const grid = document.getElementById('cocktailsGrid');
    grid.innerHTML = '';
    
    if (matchedCocktails.length === 0) {
        grid.innerHTML = '<p class="text-center text-xl gold-text-light col-span-full">No cocktails match your selection. Try adjusting your ingredients.</p>';
        return;
    }
    
    const allIngredients = [...ingredients.spirits, ...ingredients.liqueurs, ...ingredients.juices, ...ingredients.mixers, ...ingredients.flavors];
    
    matchedCocktails.forEach(cocktail => {
        const card = document.createElement('div');
        card.className = 'cocktail-card bg-card border-2 border-gray-700 rounded-lg overflow-hidden fade-in';
        
        const ingredientsList = cocktail.ingredients.map(ingId => {
            const ingredient = allIngredients.find(i => i.id === ingId);
            const isMatched = cocktail.matchedIngredients.includes(ingId);
            const displayName = ingredient ? (currentLanguage === 'zh' ? ingredient.nameCn : ingredient.name) : ingId;
            return `<span class="${isMatched ? 'gold-text' : 'text-gray-400'}">${displayName}</span>`;
        }).join(', ');
        
        card.innerHTML = `
            <div class="cocktail-image bg-gradient-to-br from-gray-800 to-gray-900 h-40 flex items-center justify-center relative">
                <div class="text-6xl">${cocktail.image}</div>
                <div class="absolute top-3 right-3 bg-dark border-2 border-gold px-3 py-1 rounded-full">
                    <span class="match-score text-lg font-bold">${cocktail.matchScore}%</span>
                </div>
            </div>
            <div class="p-5">
                <h3 class="text-xl font-bold gold-text mb-2">${cocktail.name}</h3>
                <p class="text-gray-300 mb-3 text-sm leading-relaxed">${currentLanguage === 'zh' ? cocktail.descriptionCn : cocktail.description}</p>
                <div class="mb-4">
                    <p class="text-xs text-gray-500 mb-2 uppercase tracking-wide">${translations[currentLanguage].recipe.ingredients}</p>
                    <p class="text-sm leading-relaxed">${ingredientsList}</p>
                </div>
                <button class="btn-gold w-full py-2.5 rounded-lg text-sm font-semibold" onclick="showRecipe(${cocktail.id})">
                    ${translations[currentLanguage].recipe.viewFullRecipe}
                </button>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function showRecipe(cocktailId) {
    const cocktail = cocktails.find(c => c.id === cocktailId);
    if (!cocktail) return;
    
    const allIngredients = [...ingredients.spirits, ...ingredients.liqueurs, ...ingredients.juices, ...ingredients.mixers, ...ingredients.flavors];
    const ingredientsList = cocktail.ingredients.map(ingId => {
        const ingredient = allIngredients.find(i => i.id === ingId);
        const displayName = ingredient ? (currentLanguage === 'zh' ? ingredient.nameCn : ingredient.name) : ingId;
        return `<li class="gold-text-light">${displayName}</li>`;
    }).join('');
    
    document.getElementById('modalTitle').textContent = cocktail.name;
    document.getElementById('modalContent').innerHTML = `
        <div class="text-center mb-6">
            <div class="text-8xl mb-4">${cocktail.image}</div>
            <p class="text-gray-300">${currentLanguage === 'zh' ? cocktail.descriptionCn : cocktail.description}</p>
        </div>
        <div class="mb-6">
            <h3 class="text-xl font-semibold gold-text mb-3">${translations[currentLanguage].recipe.ingredients}</h3>
            <ul class="list-disc list-inside space-y-2">
                ${ingredientsList}
            </ul>
        </div>
    `;
    
    document.getElementById('recipeModal').classList.add('active');
}

function closeModal() {
    document.getElementById('recipeModal').classList.remove('active');
}

function addToMenu() {
    alert('This cocktail has been added to your event menu! Our team will contact you to finalize the details.');
    closeModal();
}

function refineSelection() {
    document.getElementById('step2').classList.add('hidden');
    
    // Check if user came from quiz or ingredient selection
    const cameFromIngredients = selectedIngredients.spirits.length > 0 || 
                                 selectedIngredients.liqueurs.length > 0 ||
                                 selectedIngredients.juices.length > 0 ||
                                 selectedIngredients.mixers.length > 0 ||
                                 selectedIngredients.flavors.length > 0;
    
    if (cameFromIngredients) {
        document.getElementById('step1').classList.remove('hidden');
        document.getElementById('step1').scrollIntoView({ behavior: 'smooth' });
    } else {
        document.getElementById('quiz-page-1').classList.remove('hidden');
        document.getElementById('quiz-page-1').scrollIntoView({ behavior: 'smooth' });
    }
}


function navigateMenu(direction) {
    if (relevantMenuPages.length === 0) return;
    
    currentMenuPageIndex += direction;
    
    if (currentMenuPageIndex < 0) {
        currentMenuPageIndex = relevantMenuPages.length - 1;
    } else if (currentMenuPageIndex >= relevantMenuPages.length) {
        currentMenuPageIndex = 0;
    }
    
    displayCurrentMenuPage();
}

function displayCurrentMenuPage() {
    if (relevantMenuPages.length === 0) return;
    
    const currentPage = relevantMenuPages[currentMenuPageIndex];
    const menuImage = document.getElementById('menuImage');
    const pageIndicator = document.getElementById('menuPageIndicator');
    const prevBtn = document.getElementById('prevMenuBtn');
    const nextBtn = document.getElementById('nextMenuBtn');
    
    menuImage.src = currentPage.imageUrl;
    menuImage.alt = currentPage.name;
    
    if (relevantMenuPages.length > 1) {
        pageIndicator.textContent = `${currentMenuPageIndex + 1} / ${relevantMenuPages.length}`;
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    } else {
        pageIndicator.textContent = '';
        prevBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
    }
}

document.addEventListener('click', (e) => {
    const modal = document.getElementById('recipeModal');
    if (e.target === modal) {
        closeModal();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});
