namespace nsorcabreja {
    export class Store {
        private name: string;
        constructor(store?: Store) {
            if (store) {
                this.name = store.name;
            }
        }

        getName() {
            return this.name;
        }

        setName(name: string) {
            this.name = name;
        }
    }
}