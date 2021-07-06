export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Item[];

    private readonly maxQuality = 50;

    constructor(items: Item[] = []) {
        this.items = items;
    }

    updateQuality() {
        this.items = this.items.map(item => {
            switch (item.name) {
                case "Aged Brie":
                    if (item.sellIn <= 0) item.quality += 2;
                    else item.quality++;
                    break;
                case "Backstage passes to a TAFKAL80ETC concert":
                    if (item.sellIn <= 0) item.quality = 0;
                    else if (item.sellIn <= 5) item.quality += 3;
                    else if (item.sellIn <= 10) item.quality += 2;
                    else item.quality++;
                    break;
                case "Sulfuras, Hand of Ragnaros":
                    break;
                case "Conjured Mana Cake":
                    if (item.sellIn <= 0) item.quality -= 4;
                    else item.quality -= 2;
                    break;
                default:
                    if (item.sellIn <= 0) item.quality -= 2;
                    else item.quality--;
                    break;
            }

            item.quality = Math.max(item.quality, 0);
            item.quality = Math.min(item.quality, this.maxQuality);

            if (item.name !== "Sulfuras, Hand of Ragnaros") item.sellIn--;

            return item;
        });
        return this.items;
    }
}
