/**
 * @author Ramyres Pereira Aquino
 * @version 1.0.0
 * @since 16/08/2018
 * @class OrcaBreja
 */
/// <reference path="entity/beer.ts" />
/// <reference path="entity/brands.ts" />
/// <reference path="entity/budget.ts" />
/// <reference path="entity/stores.ts" />
/// <reference path="entity/size.ts" />
/// <reference path="./view.ts" />

namespace nsorcabreja {
    declare const Promise: any;
    class OrcaBreja {
        private brands: Array<Brand>;
        private budgets: Array<Budget>;
        private sizes: Array<Size>;
        private database: any;
        private view: View;

        constructor() {
            this.brands = new Array<Brand>();
            this.budgets = new Array<Budget>();
            this.sizes = new Array<Size>();
            this.view = new View(this);

            this.loadDatabase().then((database: any) => {
                try {
                    this.loadBrands();
                    this.loadSizes();
                } finally {
                    this.view.prepareModalBrands(this.brands);
                    this.view.prepareSelectBrands(this.brands);
                    this.view.prepareSelectSizes(this.sizes);
                    this.view.init();
                }
            });
        }

        calcule(brand_str: string, size_str: string, qttd: number, price: number) {
            let new_beer: any = {
                brand: new Brand(JSON.parse(brand_str)),
                size: new Size(JSON.parse(size_str)),
                price: price,
                count: qttd
            }
            let budget = new Budget(new Beer(new_beer));
            this.budgets.push(budget);
            this.view.addResultCard(budget);
        }

        removeBudgetById(id: number) {
            this.budgets.forEach((budget: Budget, index: number) => {
                if (budget.getId() === id) {
                    this.budgets.splice(index, 1);
                }
            });
        }

        loadBrands() {
            if (this.database.brands) {
                this.database.brands.forEach((brand: any) => {
                    this.brands.push(new Brand(brand));
                });
            }
        }

        loadSizes() {
            if (this.database.sizes) {
                this.database.sizes.forEach((size: any) => {
                    this.sizes.push(new Size(size));
                });
            }
        }

        loadDatabase() {
            return new Promise((resolve: any, reject: any) => {
                let xhr = new XMLHttpRequest();
                xhr.addEventListener("load", (e) => {
                    if (xhr.status === 200 && xhr.readyState === 4) {
                        this.database = JSON.parse(xhr.response);
                        resolve(this.database);
                    }
                });
                xhr.overrideMimeType("application/json; charset=utf-8");
                xhr.open("GET", "/database.json", true);
                xhr.send();
            })
        }
    }

    const app = new OrcaBreja();
}

