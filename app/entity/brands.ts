namespace nsorcabreja {
    export class Brand {
        private name: string;
        private label: string;

        constructor(brand: Brand) {
            this.name = brand.name;
            this.label = (!brand.label) ? "default.jpg" : brand.label;
        }

        getName() {
            return this.name;
        }

        setName(name: string) {
            this.name = name;
        }

        getLabel() {
            return this.label;
        }

        setLabel(label: string) {
            this.label = label;
        }


        toJsonString(): string {
            let json = JSON.stringify(this);
            return json;
        }

        loadByJsonString(json: string): Brand {
            let brand = JSON.parse(json);
            return new Brand(brand);
        }
    }
}