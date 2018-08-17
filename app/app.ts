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

namespace nsorcabreja {

    class OrcaBreja {
        private beers: Array<Beer>;
        private brands: Array<Brand>;
        private budgets: Array<Budget>;
        private stores: Array<Store>;

        constructor() {
            this.beers = new Beer().getAll();
            this.brands = new Brand().getAll();
            this.budgets = new Budget().getAll();
            this.stores = new Store().getAll();
        }
    }

    const app = new OrcaBreja();
}

