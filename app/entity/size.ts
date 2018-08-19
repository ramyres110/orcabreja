namespace nsorcabreja {
    enum Packing {
        lata = "lata",
        longneck = "long neck",
        garrafa = "garrafa",
    }

    enum Unity {
        ml = "ml",
        lt = "lt"
    }

    export class Size {
        private packing: Packing;
        private size: number;
        private unity: Unity;

        constructor(size?: Size) {
            if (size) {
                this.packing = size.packing;
                this.size = size.size;
                this.unity = size.unity;
            }
        }

        getDescription() {
            let unit = (this.size >= 1000) ? (this.size / 1000) + "lt" : this.size + this.unity;
            return [this.packing, " (", unit, ")"].join("");
        }

        getPacking(): Packing {
            return this.packing;
        }
        setPacking(value: Packing) {
            this.packing = value;
        }
        getSize(): number {
            return this.size;
        }
        setSize(value: number) {
            this.size = value;
        }
        getUnity(): Unity {
            return this.unity;
        }
        setUnity(value: Unity) {
            this.unity = value;
        }

        toJsonString(): string {
            let json = JSON.stringify(this);
            return json;
        }

        loadByJsonString(json: string): Size {
            let size = JSON.parse(json);
            return new Size(size);
        }
    }
}