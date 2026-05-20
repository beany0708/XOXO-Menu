const drinkNameNormalizations = {
    'espresso martini': 'Espresso Martini',
    'expresso martini': 'Espresso Martini',
    'coffee martini': 'Espresso Martini',
    'old fashioned': 'Old Fashioned',
    'old-fashioned': 'Old Fashioned',
    'whiskey old fashioned': 'Old Fashioned',
    'margarita': 'Margarita',
    'classic margarita': 'Margarita',
    'marg': 'Margarita',
    'negroni': 'Negroni',
    'mojito': 'Mojito',
    'mint mojito': 'Mojito',
    'cosmopolitan': 'Cosmopolitan',
    'cosmo': 'Cosmopolitan',
    'manhattan': 'Manhattan',
    'martini': 'Martini',
    'dry martini': 'Martini',
    'gin martini': 'Martini',
    'vodka martini': 'Vodka Martini',
    'daiquiri': 'Daiquiri',
    'whiskey sour': 'Whiskey Sour',
    'whisky sour': 'Whiskey Sour',
    'gin and tonic': 'Gin & Tonic',
    'gin & tonic': 'Gin & Tonic',
    'g&t': 'Gin & Tonic',
    'moscow mule': 'Moscow Mule',
    'bloody mary': 'Bloody Mary',
    'mai tai': 'Mai Tai',
    'pina colada': 'Piña Colada',
    'piña colada': 'Piña Colada',
    'pineapple colada': 'Piña Colada',
    'white russian': 'White Russian',
    'black russian': 'Black Russian',
    'tequila sunrise': 'Tequila Sunrise',
    'aperol spritz': 'Aperol Spritz',
    'french martini': 'French Martini',
    'amaretto sour': 'Amaretto Sour',
    'long island iced tea': 'Long Island Iced Tea',
    'long island': 'Long Island Iced Tea',
    'cape codder': 'Cape Codder',
    'vodka cranberry': 'Cape Codder',
    'kamikaze': 'Kamikaze',
    'sex on the beach': 'Sex on the Beach',
    'blue lagoon': 'Blue Lagoon',
    'tom collins': 'Tom Collins',
    'john collins': 'Tom Collins',
    'singapore sling': 'Singapore Sling',
    'mint julep': 'Mint Julep',
    'sazerac': 'Sazerac',
    'boulevardier': 'Boulevardier',
    'aviation': 'Aviation',
    'last word': 'Last Word',
    'corpse reviver': 'Corpse Reviver',
    'sidecar': 'Sidecar',
    'bramble': 'Bramble',
    'paloma': 'Paloma',
    'caipirinha': 'Caipirinha',
    'dark and stormy': 'Dark and Stormy',
    'dark n stormy': 'Dark and Stormy',
    'penicillin': 'Penicillin',
    'paper plane': 'Paper Plane',
    'bee\'s knees': 'Bee\'s Knees',
    'bees knees': 'Bee\'s Knees',
    'clover club': 'Clover Club',
    'vesper': 'Vesper',
    'vesper martini': 'Vesper',
    'irish coffee': 'Irish Coffee',
    'b-52': 'B-52',
    'b52': 'B-52'
};

class PDFProcessor {
    constructor() {
        this.pdfPages = [];
        this.extractedCocktails = [];
        this.uniquePageHashes = new Set();
        this.processedMenuImages = [];
    }

    normalizeDrinkName(rawName) {
        const cleaned = rawName.toLowerCase().trim();
        
        if (drinkNameNormalizations[cleaned]) {
            return drinkNameNormalizations[cleaned];
        }
        
        for (const [pattern, normalized] of Object.entries(drinkNameNormalizations)) {
            if (cleaned.includes(pattern) || pattern.includes(cleaned)) {
                return normalized;
            }
        }
        
        return rawName.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    async loadPDF(file) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        console.log(`PDF loaded: ${pdf.numPages} pages`);
        return pdf;
    }

    async extractPageAsImage(pdf, pageNumber) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 2.0 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;
        
        return canvas.toDataURL('image/png');
    }

    async hashImage(imageDataUrl) {
        const response = await fetch(imageDataUrl);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async extractTextFromImage(imageDataUrl) {
        try {
            const result = await Tesseract.recognize(imageDataUrl, 'eng', {
                logger: m => console.log(m)
            });
            return result.data.text;
        } catch (error) {
            console.error('OCR Error:', error);
            return '';
        }
    }

    parseIngredientsFromText(text) {
        const commonIngredients = [
            'vodka', 'gin', 'rum', 'tequila', 'whiskey', 'whisky', 'bourbon',
            'triple sec', 'cointreau', 'amaretto', 'baileys', 'kahlua', 'kahlúa', 'chambord',
            'lime juice', 'lemon juice', 'orange juice', 'cranberry juice', 'pineapple juice',
            'tonic water', 'soda water', 'ginger beer', 'cola',
            'simple syrup', 'sugar', 'bitters', 'vermouth', 'campari', 'aperol',
            'mint', 'basil', 'cucumber', 'strawberry', 'raspberry', 'blackberry',
            'cream', 'milk', 'coconut cream', 'egg white', 'coffee', 'espresso'
        ];
        
        const foundIngredients = [];
        const lowerText = text.toLowerCase();
        
        for (const ingredient of commonIngredients) {
            if (lowerText.includes(ingredient)) {
                foundIngredients.push(ingredient);
            }
        }
        
        return foundIngredients;
    }

    extractCocktailsFromText(text) {
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        const cocktails = [];
        
        let currentCocktail = null;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            const drinkPattern = /^([A-Z][a-zA-Z\s&'-]+)(?:\s*\$|\s*\d+)?$/;
            const match = line.match(drinkPattern);
            
            if (match && line.length < 50 && line.length > 3) {
                if (currentCocktail) {
                    cocktails.push(currentCocktail);
                }
                
                const rawName = match[1].trim();
                currentCocktail = {
                    name: this.normalizeDrinkName(rawName),
                    rawName: rawName,
                    ingredients: [],
                    description: ''
                };
            } else if (currentCocktail) {
                if (line.length > 20 && line.length < 200) {
                    currentCocktail.description += (currentCocktail.description ? ' ' : '') + line;
                }
                
                const ingredients = this.parseIngredientsFromText(line);
                currentCocktail.ingredients.push(...ingredients);
            }
        }
        
        if (currentCocktail) {
            cocktails.push(currentCocktail);
        }
        
        return cocktails.filter(c => c.ingredients.length > 0);
    }

    deduplicateCocktails(cocktails) {
        const uniqueCocktails = new Map();
        
        for (const cocktail of cocktails) {
            const normalizedName = cocktail.name;
            
            if (!uniqueCocktails.has(normalizedName)) {
                uniqueCocktails.set(normalizedName, cocktail);
            } else {
                const existing = uniqueCocktails.get(normalizedName);
                
                if (cocktail.ingredients.length > existing.ingredients.length) {
                    existing.ingredients = [...new Set([...existing.ingredients, ...cocktail.ingredients])];
                }
                
                if (cocktail.description.length > existing.description.length) {
                    existing.description = cocktail.description;
                }
            }
        }
        
        return Array.from(uniqueCocktails.values());
    }

    async processPDF(file, onProgress) {
        this.pdfPages = [];
        this.extractedCocktails = [];
        this.uniquePageHashes.clear();
        this.processedMenuImages = [];
        
        const pdf = await this.loadPDF(file);
        const totalPages = pdf.numPages;
        
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            if (onProgress) {
                onProgress({
                    stage: 'extracting',
                    current: pageNum,
                    total: totalPages,
                    message: `Extracting page ${pageNum} of ${totalPages}...`
                });
            }
            
            const imageDataUrl = await this.extractPageAsImage(pdf, pageNum);
            const imageHash = await this.hashImage(imageDataUrl);
            
            if (!this.uniquePageHashes.has(imageHash)) {
                this.uniquePageHashes.add(imageHash);
                this.pdfPages.push({
                    pageNumber: pageNum,
                    imageDataUrl: imageDataUrl,
                    hash: imageHash
                });
            } else {
                console.log(`Page ${pageNum} is a duplicate, skipping...`);
            }
        }
        
        console.log(`Extracted ${this.pdfPages.length} unique pages from ${totalPages} total pages`);
        
        const allCocktails = [];
        for (let i = 0; i < this.pdfPages.length; i++) {
            const page = this.pdfPages[i];
            
            if (onProgress) {
                onProgress({
                    stage: 'ocr',
                    current: i + 1,
                    total: this.pdfPages.length,
                    message: `Processing page ${i + 1} of ${this.pdfPages.length} with OCR...`
                });
            }
            
            const text = await this.extractTextFromImage(page.imageDataUrl);
            const cocktails = this.extractCocktailsFromText(text);
            
            page.cocktails = cocktails;
            page.extractedText = text;
            
            allCocktails.push(...cocktails.map(c => ({ ...c, pageNumber: page.pageNumber })));
        }
        
        if (onProgress) {
            onProgress({
                stage: 'deduplicating',
                message: 'Deduplicating and normalizing cocktails...'
            });
        }
        
        this.extractedCocktails = this.deduplicateCocktails(allCocktails);
        
        this.processedMenuImages = this.pdfPages.map(page => ({
            id: `page-${page.pageNumber}`,
            name: `Menu Page ${page.pageNumber}`,
            imageUrl: page.imageDataUrl,
            cocktailNames: page.cocktails.map(c => c.name),
            pageNumber: page.pageNumber
        }));
        
        if (onProgress) {
            onProgress({
                stage: 'complete',
                message: `Processing complete! Found ${this.extractedCocktails.length} unique cocktails.`
            });
        }
        
        return {
            pages: this.pdfPages,
            cocktails: this.extractedCocktails,
            menuImages: this.processedMenuImages
        };
    }

    convertToCocktailFormat(extractedCocktail, id) {
        const ingredientMapping = {
            'vodka': 'vodka',
            'gin': 'gin',
            'rum': 'rum',
            'tequila': 'tequila',
            'whiskey': 'whiskey',
            'whisky': 'whiskey',
            'bourbon': 'bourbon',
            'triple sec': 'triple-sec',
            'cointreau': 'cointreau',
            'amaretto': 'amaretto',
            'baileys': 'baileys',
            'kahlua': 'kahlua',
            'kahlúa': 'kahlua',
            'chambord': 'chambord',
            'lime juice': 'lime-juice',
            'lemon juice': 'lemon-juice',
            'orange juice': 'orange-juice',
            'cranberry juice': 'cranberry',
            'pineapple juice': 'pineapple',
            'tonic water': 'tonic',
            'soda water': 'tonic'
        };
        
        const mappedIngredients = extractedCocktail.ingredients
            .map(ing => ingredientMapping[ing.toLowerCase()] || ing)
            .filter((v, i, a) => a.indexOf(v) === i);
        
        const emojiMap = {
            'margarita': '🍹',
            'martini': '🍸',
            'mojito': '🍹',
            'espresso martini': '☕',
            'coffee': '☕',
            'whiskey': '🥃',
            'bourbon': '🥃',
            'old fashioned': '🥃',
            'tropical': '🍹',
            'piña colada': '🥥',
            'default': '🍸'
        };
        
        let emoji = emojiMap.default;
        for (const [key, value] of Object.entries(emojiMap)) {
            if (extractedCocktail.name.toLowerCase().includes(key)) {
                emoji = value;
                break;
            }
        }
        
        return {
            id: id,
            name: extractedCocktail.name,
            ingredients: mappedIngredients,
            description: extractedCocktail.description || `A classic ${extractedCocktail.name}.`,
            method: 'Preparation method from menu.',
            image: emoji,
            menuCategory: `page-${extractedCocktail.pageNumber}`
        };
    }

    getBestMenuPage(matchedCocktails) {
        const pageScores = new Map();
        
        for (const page of this.processedMenuImages) {
            let score = 0;
            
            for (const cocktail of matchedCocktails) {
                if (page.cocktailNames.includes(cocktail.name)) {
                    score += cocktail.matchScore || 100;
                }
            }
            
            pageScores.set(page.id, { page, score });
        }
        
        const sortedPages = Array.from(pageScores.values())
            .sort((a, b) => b.score - a.score);
        
        return sortedPages.length > 0 ? sortedPages[0].page : this.processedMenuImages[0];
    }
}

const pdfProcessor = new PDFProcessor();
