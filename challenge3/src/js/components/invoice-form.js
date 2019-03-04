import { Element } from '../lib/element';
import { Input } from '../lib/input';
import { debounce } from '../lib/debounce';
import { InvoiceData }  from './invoice-data';
import { invoiceInputsConfig } from './invoice-inputs.config';
import { Validator } from '../lib/validator';

export class InvoiceForm { 
    constructor(params = {}) {
        this.parent = params.parent || document.body;
        this.form = new Element('form');
        this.textInputs = null;
        this.radioInputs = null;
        this.validator = new Validator();
        this.data = new InvoiceData();
        
        this.init();
    }

    init() {
        this.createInputs();
        this.textInputs = [...this.form.element.querySelectorAll('input[type="text"]')];
        this.radioInputs = [...this.form.element.querySelectorAll('input[type="radio"]')];
        this.parent.appendChild(this.form.element);
        this.data.writeDataToTextInputs(this.textInputs);
        this.data.writeDataToRadioInputs(this.radioInputs);
    }
    
    saveTextInput(e) {
        if (this.canSaveValue(e.target)) {
            this.data.saveTextInput(e.target);
        } 
    }

    saveRadioInput(e) {
        this.data.saveRadioInput(e.target);
    }

    canSaveValue(input) {
        const errorMsg = input.nextSibling;
        
        if (this.isValidInput(input)) {        
            if (!errorMsg.classList.contains('hidden')) {
                errorMsg.classList.add('hidden');
            }
            return true;
        } else {
            errorMsg.classList.remove('hidden');
            return false;
        }
    }

    isValidInput(input) {
        if (input.dataset.validation === 'notEmpty') {
            return this.validator.isNotEmpty(input.value);
        }
        else if (input.dataset.validation === 'text') {
            return this.validator.isTextString(input.value);
        }
        else if (input.dataset.validation === 'number') { 
            return this.validator.isNumberValid(input.value);
        }
        else if (input.dataset.validation === 'nipCode') {
            return this.validator.isNipValid(input.value);
        }
        else if (input.dataset.validation === 'postcode') {
            return this.validator.isPostcodeValid(input.value);
        }
        return false;
    }

    createInputs() {
        const container = new Element('div', 'container');
        const innerContainerTop = new Element('div', 'inner-container');
        const innerContainerBottom = new Element('div', 'inner-container');
        const innerContainerBlockLeft = document.createDocumentFragment();
        const innerContainerBlockRight = document.createDocumentFragment();
        const innerContainerBottomLeft = document.createDocumentFragment();
        const innerContainerBottomRight = document.createDocumentFragment();

        for (let prop in invoiceInputsConfig) {

            if (prop === 'customer') {
                for (let customerProp in invoiceInputsConfig[prop]) {
                    innerContainerBlockLeft.appendChild(
                        this.createTextInput(invoiceInputsConfig[prop][customerProp]) 
                    )
                }
            }
            else if (prop === 'company') {
                for (let companyProp in invoiceInputsConfig[prop]) {
                    innerContainerBlockRight.appendChild(
                        this.createTextInput(invoiceInputsConfig[prop][companyProp]) 
                    )
                }
            }
            else if (prop === 'payment') {
                innerContainerBottomLeft.appendChild(
                    this.createTextInput(invoiceInputsConfig[prop])
                )
            }
            else if (prop === 'status') {
                for (let statusProp in invoiceInputsConfig[prop]) {
                    innerContainerBottomRight.appendChild(
                        this.createRadioInput(invoiceInputsConfig[prop][statusProp]) 
                    )
                }
            }
        }

        innerContainerTop.element.appendChild(
            this.wrapped({elem: innerContainerBlockLeft, className: 'inner-container__block'}));
        innerContainerTop.element.appendChild(
            this.wrapped({elem: innerContainerBlockRight, className: 'inner-container__block'}));

        innerContainerBottom.element.appendChild(
            this.wrapped({elem: innerContainerBottomLeft, className: 'inner-container__block'}));
        innerContainerBottom.element.appendChild(
            this.wrapped({elem: innerContainerBottomRight, className: 'inner-container__block'}))

        container.element.appendChild(innerContainerTop.element);
        container.element.appendChild(innerContainerBottom.element);

        this.form.element.appendChild(container.element);
    }

    createTextInput(params = {}) {
        const container = new Element('div', 'input-container');

        const label = this.createLabel(params.labelName);
        const input = Input({ type: params.type, name: params.name });
        input.dataset['validation'] = params.validation;

        const errorMsg = this.createErrorMsg(params.errorMsg, ['error', 'hidden']);

        input.addEventListener('keyup', 
            debounce(this.saveTextInput.bind(this), 500)
        );

        container.element.appendChild(label.element);
        container.element.appendChild(input);
        container.element.appendChild(errorMsg.element);
        
        return container.element;
    }

    createRadioInput(params = {}) {
        const container = new Element('div', 'radio-input-container');

        const label = this.createLabel(params.labelName);
        const input = Input({type: params.type, name: params.name});
        input.value = params.value;

        input.addEventListener('change', 
            debounce(this.saveRadioInput.bind(this), 500)
        );

        container.element.appendChild(label.element);
        container.element.appendChild(input);

        return container.element;
    }

    createLabel(textContent) {
        const label = new Element('label');
        label.element.textContent = textContent;

        return label;
    }

    createErrorMsg(msg, classNames) {
        const errorMsg = new Element('div', classNames);
        errorMsg.element.textContent = msg;

        return errorMsg;
    }

    wrapped(params = {}) {
        const container = new Element('div', params.className);
        container.element.appendChild(params.elem);

        return container.element;
    }
}