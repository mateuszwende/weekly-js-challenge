import { Element } from '../lib/element';

export class PrimeNumbers {
    constructor() {
        this.note = null;
        this.container = null;
        this.input = null;
        this.displayer = null;

        this.init();
    }

    init() {
        this.createElements();
        this.setTitleContent();
        this.setInputType('text');
        this.appendElementsToDOM();
        this.applyEventListener(this.input.element);
    }

    createElements() {
        this.note = new Element('h6');
        this.container = new Element('div', 'container');
        this.input = new Element('input');
        this.displayer = new Element('div', 'prime-nums-displayer');
    }

    setTitleContent() {
        this.note.element.textContent = 'Write number from 0 to 10000. The program will display all prime numbers < value you give.';
    }

    setInputType(type) {
        this.input.element.type = type;
    }

    appendElementsToDOM() {
        document.body.appendChild(this.note.element);
        document.body.appendChild(this.container.element);
        this.container.element.appendChild(this.input.element);
        this.container.element.appendChild(this.displayer.element);
    }

    applyEventListener(elem) {
        elem.addEventListener('keyup', this.displayPrimeNumbers.bind(this));
    }

    displayPrimeNumbers() {
        let inputValue = parseInt(this.input.element.value, 10);          
        if (Number.isNaN(inputValue) || inputValue < 0 || inputValue > 10000) return;

        const primeNumsArr = this.getArrPrimeNumsTo(inputValue);

        if (this.displayer.element) {
            this.displayer.element.innerHTML = '';
        }
        
        primeNumsArr.forEach(num => {
            const p = new Element('p');
            p.element.textContent = num;
            this.displayer.element.appendChild(p.element);
        });
    }

    getArrPrimeNumsTo(val) {
        let arr = [];
        for (let i = 2; i < val; i++) {
            let prime = true;
            for (let j = 2; j < i; j++) {
                if (i % j === 0) prime = false;
            }
            if (prime) arr.push(i);
        }
        return arr; 
    }
}