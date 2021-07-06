import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
    });

    it('lower sellIn on update', function() {
        const gildedRose = new GildedRose([ new Item('foo', 10, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(9);
    });

    it('lower quality on update', function() {
        const gildedRose = new GildedRose([ new Item('foo', 10, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(9);
    });

    it('lower quality twice as fast after sell by date', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(8);
    });

    it('maintain non-negative quality', function() {
        const gildedRose = new GildedRose([ new Item('foo', 10, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });

    it('increase quality of Aged Brie', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 10, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(11);
    });

    it('increase quality of Aged Brie twice as fast after sell by date', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 0, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(12);
    });

    it('maintain quality below 50', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 10, 50) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
    });

    it('maintain quality and sellIn of Sulfuras', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 10, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(10);
        expect(items[0].sellIn).to.equal(10);
    });

    it('increase quality of backstage passes', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 20, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(11);
    });

    it('increase quality of backstage passes by 2 in last 10 days', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 8, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(12);
    });

    it('increase quality of backstage passes by 3 in last 5 days', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 4, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(13);
    });

    it('set quality of backstage passes to 0 on day of concert', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });

    it('degrade quality of conjured items twice as fast', function() {
        const gildedRose = new GildedRose([ new Item('Conjured Mana Cake', 10, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(8);
    });

    it('degrade quality of conjured items four times as fast after sell by date', function() {
        const gildedRose = new GildedRose([ new Item('Conjured Mana Cake', 0, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(6);
    });

});
