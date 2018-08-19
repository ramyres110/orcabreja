/// <reference path="./beer.ts" />

namespace nsorcabreja {
    export class Budget {
        private id: number;
        private beer: Beer;
        private priceUnit: number;
        private priceMl: number;
        private priceLt: number;

        constructor(beer: Beer) {
            this.id = new Date().getTime();
            this.beer = beer;
            this.calcule();
        }

        private calcule() {
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