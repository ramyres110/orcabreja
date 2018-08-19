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
            this.selectSizeCollection = document.querySelector('#select-size-collection');
            this.inputCount = document.querySelector('#input-quantity');
            this.inputPrice = document.querySelector('#input-price');
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
            const sidenavInstances = M.Sidenav.init(sidenav, optionsSidenav);

            const optionsfixbtn = {
                direction: 'up',
                hoverEnabled: false
            };
            const fixedbutton = document.querySelectorAll('.fixed-action-btn');
            const fixedbuttonInstances = M.FloatingActionButton.init(fixedbutton, optionsfixbtn);

            const modaloptions = {};
            const modals = document.querySelectorAll('.modal');
            const modalsInstances = M.Modal.init(modals, modaloptions);

            const optionsparallax = {};
            const parallax = document.querySelectorAll('.parallax');
            const paralaxInstances = M.Parallax.init(parallax, optionsparallax);

            const optionsSelects = {};
            const selects = document.querySelectorAll('select');
            const selectInstances = M.FormSelect.init(selects, optionsSelects);

            this.loadDropdowns();

            M.updateTextFields();
        }

        private loadButtonDeleteCard() {
            let elements = document.querySelectorAll('#btn-delete-card');
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                element.addEventListener('click', (ev: MouseEvent) => {
                    ev.preventDefault();
                    let target: any = ev.target;
                    let id = "#card" + target.getAttribute('data-target');
                    document.querySelector(id).remove();
                    this.control.removeBudgetById(id.split('card')[1]);
                })
            }
        }

        private loadDropdowns() {
            const dropOptions = {
                alignment: 'bottom'
            };
            const dropdowns = document.querySelectorAll('.dropdown-trigger');
            const dropdownsInstances = M.Dropdown.init(dropdowns, dropOptions);
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
            cardCol.id = "card" + budget.getId();
            let template = `
                <div class="card">
                    <div class="card-content">
                        <span class="card-title grey-text text-darken-4">
                            ${budget.getBeer().getBrand().getName()}
                            <i class="material-icons right dropdown-trigger" data-target='card-option'>more_vert</i>
                            <ul id='card-option' class='dropdown-content'>
                                <li>
                                    <a href="#!" id="btn-delete-card" data-target=${budget.getId()}>Excluir</a>
                                </li>
                            </ul>
                        </span>
                        <h5 class="center">
                            ${budget.getBeer().getCount()} x ${budget.getBeer().getSize().getPacking()} (
                                ${budget.getBeer().getSize().getSize()}${budget.getBeer().getSize().getUnity()}
                            ) por R$ ${budget.getBeer().getPrice()}
                        </h5>
                        <p class="center"> Valor Unidade R$ ${(budget.getPriceUnit() + "").substring(0, 5)}</p>
                        <div class="row center">
                            <div class="col s6">
                                <p class="">Preço da ml</p>
                                <h4>R$ ${(budget.getPriceMl() + "").substring(0, 7)}...</h4>
                            </div>
                            <div class="col s6">
                                <p>Preço do lt</p>
                                <h4>R$ ${(budget.getPriceLt() + "").substring(0, 5)}</h4>
                            </div>
                        </div>
                    </div>
                </div>`;
            cardCol.innerHTML = template;
            this.contentRow.appendChild(cardCol);
            this.loadDropdowns();
            this.loadButtonDeleteCard();
        }
    }
}