/// <reference path="./entity/budget.ts" />
/// <reference path="./entity/brands.ts" />
/// <reference path="./entity/size.ts" />

namespace nsorcabreja {
    declare const M: any;
    export class View {
        private control: any;
        private modalBrandCollection: HTMLUListElement;
        private selectBrandCollection: HTMLSelectElement;
        private selectSizeCollection: HTMLSelectElement;
        private inputCount: HTMLInputElement;
        private inputPrice: HTMLInputElement;
        private btnCalcule: HTMLButtonElement;

        private contentRow: HTMLDivElement;

        constructor(control: any) {
            this.control = control;
            this.contentRow = document.querySelector('#row-content');
            this.modalBrandCollection = document.querySelector('#modal-brands-collection');
            this.selectBrandCollection = document.querySelector('#select-brands-collection');
            this.selectBrandCollection.addEventListener('keypress', (ev: KeyboardEvent) => {
                this.inputCalculeEnterClick(ev.keyCode);
            })
            this.selectSizeCollection = document.querySelector('#select-size-collection');
            this.selectSizeCollection.addEventListener('keypress', (ev: KeyboardEvent) => {
                this.inputCalculeEnterClick(ev.keyCode);
            })
            this.inputCount = document.querySelector('#input-quantity');
            this.inputCount.addEventListener('keypress', (ev: KeyboardEvent) => {
                this.inputCalculeEnterClick(ev.keyCode);
            })
            this.inputPrice = document.querySelector('#input-price');
            this.inputPrice.addEventListener('keypress', (ev: KeyboardEvent) => {
                this.inputCalculeEnterClick(ev.keyCode);
            })
            this.btnCalcule = document.querySelector('#btn-calcule');
            this.btnCalcule.addEventListener('click', (ev: Event) => {
                ev.preventDefault();
                this.btnCalculeClick();
            })
        }

        init() {
            const optionsSidenav = {
                edge: "left",
                draggable: true,
                preventScrolling: true
            };
            const sidenav = document.querySelectorAll('.sidenav');
            M.Sidenav.init(sidenav, optionsSidenav);
            const optionsfixbtn = {
                direction: 'up',
                hoverEnabled: false
            };
            const fixedbutton = document.querySelectorAll('.fixed-action-btn');
            M.FloatingActionButton.init(fixedbutton, optionsfixbtn);
            const modaloptions = {};
            const modals = document.querySelectorAll('.modal');
            M.Modal.init(modals, modaloptions);
            const optionsparallax = {};
            const parallax = document.querySelectorAll('.parallax');
            M.Parallax.init(parallax, optionsparallax);
            const optionsSelects = {};
            const selects = document.querySelectorAll('select');
            M.FormSelect.init(selects, optionsSelects);
            this.loadDropdowns();
            M.updateTextFields();
        }

        private loadDropdowns() {
            const dropOptions = {
                alignment: 'bottom'
            };
            const dropdowns = document.querySelectorAll('.dropdown-trigger');
            const dropdownsInstances = M.Dropdown.init(dropdowns, dropOptions);
        }

        inputCalculeEnterClick(keyCode: number) {
            if (keyCode === 13) {
                this.btnCalcule.click();
            }
        }

        btnCalculeClick() {
            let brand = this.selectBrandCollection.value.trim();
            let size = this.selectSizeCollection.value.trim();
            let qttd = this.inputCount.value.trim();
            let price = this.inputPrice.value.trim();
            if (!brand) {
                M.toast({ html: 'Selecione a marca.' });
                this.selectBrandCollection.focus();
            } else if (!size) {
                M.toast({ html: 'Selecione o tamanho.' });
                this.selectSizeCollection.focus();
            } else if (!qttd) {
                M.toast({ html: 'Informe a quantidade.' });
                this.inputCount.focus();
            } else if (!price) {
                M.toast({ html: 'Informe o preço.' });
                this.inputPrice.focus();
            } else {
                this.control.calcule(brand, size, qttd, price);
            }
        }

        private getImageBrandPath(image: string) {
            return "/img/brands/" + image;
        }

        prepareModalBrands(brands: Array<Brand>) {
            brands.forEach((brand: Brand) => {
                let item = document.createElement('li');
                item.classList.add('collection-item', 'avatar');
                let template = `
                <img src="${this.getImageBrandPath(brand.getLabel())}" alt="" class="circle">
                <h5 class="">${brand.getName()}</h5>
                `;
                item.innerHTML = template;
                this.modalBrandCollection.appendChild(item);
            })
        }

        prepareSelectBrands(brands: Array<Brand>) {
            brands.forEach((brand: Brand) => {
                let option = document.createElement('option');
                option.value = brand.toJsonString();
                option.setAttribute("data-icon", this.getImageBrandPath(brand.getLabel()))
                option.classList.add("left")
                option.innerHTML = brand.getName();
                this.selectBrandCollection.appendChild(option);
            })
        }

        prepareSelectSizes(brands: Array<Size>) {
            brands.forEach((size: Size) => {
                let option = document.createElement('option');
                option.value = size.toJsonString();
                option.innerHTML = size.getDescription();
                this.selectSizeCollection.appendChild(option);
            })
        }

        addResultCard(budget: Budget) {
            let cardCol = document.createElement('div');
            cardCol.classList.add('col', 's12', 'm6');
            let card = document.createElement('div');
            card.classList.add('card');

            let cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            let cardTitle = document.createElement('span');
            cardTitle.classList.add('card-title', 'grey-text', 'text-darken-4')

            let img = document.createElement('img');
            img.src = "/img/brands/" + budget.getBeer().getBrand().getLabel();
            img.classList.add('circle', 'responsive-img', 'left');
            img.width = 32;
            cardTitle.appendChild(img);

            cardTitle.appendChild(document.createTextNode(budget.getBeer().getBrand().getName()));

            let icon = document.createElement('i');
            icon.classList.add('material-icons', 'right', 'dropdown-trigger')
            icon.innerHTML = 'more_vert';
            icon.setAttribute('data-target', 'card-option-' + budget.getId());
            cardTitle.appendChild(icon);

            let ul = document.createElement('ul');
            ul.id = 'card-option-' + budget.getId();
            ul.classList.add('dropdown-content');
            let li = document.createElement('li');
            let btnDeleteCard = document.createElement('a');
            btnDeleteCard.href = "#!";
            btnDeleteCard.innerHTML = "Excluir";
            btnDeleteCard.addEventListener('click', (ev: MouseEvent) => {
                ev.preventDefault();
                cardCol.remove();
                this.control.removeBudgetById(budget.getId());
            });
            li.appendChild(btnDeleteCard);
            ul.appendChild(li);
            cardTitle.appendChild(ul);

            let cardInfo = document.createElement('div');
            cardInfo.innerHTML = `
                <h6 class="center">
                    <strong>
                        ${budget.getBeer().getCount()} x ${budget.getBeer().getSize().getPacking()}
                        (${budget.getBeer().getSize().getSize()}${budget.getBeer().getSize().getUnity()}) 
                        por R$ ${budget.getBeer().getPrice()}
                    </strong>
                </h6>
                <p class="center"> Quantidade total ${budget.getTotalMl() / 1000}lt </p>
                <p class="center"> Valor unidade R$ ${(budget.getPriceUnit() + "").substring(0, 5)}</p>
                <div class="row center">
                    <div class="col s6">
                        <p>Preço da ml</p>
                        <h4><small>R$</small><strong> ${(budget.getPriceMl() + "").substring(0, 6)} </strong></h4>
                    </div>
                    <div class="col s6">
                        <p>Preço do lt</p>
                        <h4><small>R$</small><strong> ${(budget.getPriceLt() + "").substring(0, 5)} </strong></h4>
                    </div>
                </div>
            `;

            cardContent.appendChild(cardTitle);
            cardContent.appendChild(cardInfo);
            card.appendChild(cardContent);
            cardCol.appendChild(card);
            this.contentRow.insertBefore(cardCol, this.contentRow.firstChild);
            this.loadDropdowns();
        }
    }
}