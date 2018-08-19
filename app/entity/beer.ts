/// <reference path="./brands.ts" />
/// <reference path="./size.ts" />

namespace nsorcabreja {

    export class Beer {
        private brand: Brand;
        private size: Size;
        private price: number;
        private count: number;

        constructor(beer?: Beer) {
            if (beer) {
                this.brand = new Brand(beer.brand);
                this.size = new Size(beer.size);
                this.price = beer.price;
                this.count = beer.count;
            }
        }

        getBrand(): Brand {
            return this.brand;
        }
        setBrand(value: Brand) {
            this.brand = value;
        }

        getSize(): Size {
            return this.size;
        }
        setSize(value: Size) {
            this.size = value;
        }

        setCount(c: number) {
            this.count = c;
        }
        getCount(): number {
            return this.count;
        }

        getPrice(): number {
            return this.price;
        }
        setPrice(value: number) {
            this.price = value;
        }

        getDescription(): string {
            return this.brand.getName() + ' ' + this.size.getPacking() + ' ' + this.size.getSize() + this.size.getUnity();
        }
    }
}