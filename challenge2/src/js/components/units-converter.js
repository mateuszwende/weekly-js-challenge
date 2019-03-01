import { Element } from '../lib/element';
import { Units } from './units';

export class UnitsConverter {
    constructor() {
        this.title = null;
        this.container = null;
        this.input1 = null;
        this.input2 = null;
        this.select1 = null;
        this.select2 = null;
        this.note = null;
        this.units = new Units();

        this.init();
    }

    init() {
        this.createElements();
        this.setTitleContent();
        this.setInputsType('text');
        this.addOptions(this.select1.element);
        this.addOptions(this.select2.element);
        this.appendElementsToDOM();
        this.applyEventsListeners();
    }

    createElements() {
        this.title = new Element('h5');
        this.container = new Element('div', 'container');
        this.input1 = new Element('input');
        this.input2 = new Element('input');
        this.select1 = new Element('select');
        this.select2 = new Element('select');
    }

    setTitleContent() {
        this.title.element.textContent = 'Units converter';
    }

    setInputsType(type) {
        this.input1.element.type = type;
        this.input2.element.type = type;
    }

    addOptions(select) {
        this.units.getArr().forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.name;
            option.textContent = unit.name;
        
            select.appendChild(option);
        });
    }

    appendElementsToDOM() {
        document.body.appendChild(this.title.element);
        document.body.appendChild(this.container.element);
        this.container.element.appendChild(this.input1.element);
        this.container.element.appendChild(this.select1.element);
        this.container.element.appendChild(this.input2.element);
        this.container.element.appendChild(this.select2.element);
    }

    applyEventsListeners() {
        this.input1.element.addEventListener('keyup', this.updateSecondValue.bind(this));
        this.select1.element.addEventListener('change', this.updateSecondValue.bind(this));
        this.input2.element.addEventListener('keyup', this.updateSecondValue.bind(this));
        this.select2.element.addEventListener('change', this.updateSecondValue.bind(this));
    }

    updateSecondValue() {
        let input1Val = parseFloat(this.input1.element.value);          
        if (Number.isNaN(input1Val) || input1Val < 0) return;

        if (this.areSameUnits()) {
            this.input2.element.value = input1Val;
            return;
        }

        this.input2.element.value = this.units.convert(
            input1Val, this.select1.element.value, this.select2.element.value).toPrecision(5);
    }

    areSameUnits() {
        return this.select1.element.value === this.select2.element.value;
    }
}