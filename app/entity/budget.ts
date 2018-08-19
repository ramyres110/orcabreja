/// <reference path="./beer.ts" />

namespace nsorcabreja {
    export class Budget {
        private id: number;
        private beer: Beer;
        private totalMl: number;
        private priceUnit: number;
        private priceMl: number;
        private priceLt: number;

        constructor(beer: Beer) {
            this.id = new Date().getTime();
            this.beer = new Beer(beer);
            this.calcule();
        }

        private calcule() {
            this.totalMl = this.beer.getSize().getSize() * this.beer.getCount();
            this.priceUnit = this.beer.getPrice() / this.beer.getCount();
            this.priceMl = this.priceUnit / this.beer.getSize().getSize();
            this.priceLt = this.priceMl * 1000;
        }

        getId(): number {
            return this.id;
        }

        setBeer(beer: Beer) {
            this.beer = beer;
        }
        getBeer(): Beer {
            return this.beer;
        }
        getTotalMl(): number {
            return this.totalMl;
        }
        getPriceUnit(): number {
            return this.priceUnit;
        }
        getPriceMl(): number {
            return this.priceMl;
        }
        getPriceLt(): number {
            return this.priceLt;
        }
    }
}