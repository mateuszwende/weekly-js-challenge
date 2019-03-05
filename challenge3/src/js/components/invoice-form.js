import { createInput, createElement } from '../lib/dom';
import { debounce } from '../lib/debounce';
import { InvoiceData }  from './invoice-data';
import { invoiceInputsConfig } from './invoice-inputs.config';
import { Validator } from '../lib/validator';

export class InvoiceForm { 
    constructor(params = {}) {
        this.parent = params.parent || document.body;
        this.form = null;
        this.textInputs = null;
        this.radioInputs = null;
        this.modificationDateElem = null;
        this.validator = new Validator();
        this.data = new InvoiceData();
        
        this.init();
    }

    init() {
        this.form = this.createForm();
        this.form.appendChild(this.createInputs());
        this.form.appendChild(this.createModificationDateElement());
        this.parent.appendChild(this.form);  

        this.textInputs = [...this.form.querySelectorAll('input[type="text"]')];
        this.radioInputs = [...this.form.querySelectorAll('input[type="radio"]')];
        this.modificationDateElem = this.form.querySelector('.modification-date-js');

        this.fillFormWithStoredData();
    }

    fillFormWithStoredData() {
        this.data.writeDataToTextInputs(this.textInputs);
        this.data.writeDataToRadioInputs(this.radioInputs);
        this.data.writeModificationDate(this.modificationDateElem);
    }
    
    saveTextInput(e) {
        if (this.canSaveValue(e.target)) {
            try {
                this.data.saveTextInput(e.target);
                this.data.writeModificationDate(this.modificationDateElem);
            }
            catch(error) {
                console.error(error);         
            }
        } 
    }

    saveRadioInput(e) {
        this.data.saveRadioInput(e.target);
        this.data.writeModificationDate(this.modificationDateElem);
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
        const container = document.createDocumentFragment();
        const innerContainerTop = createElement('div', 'inner-container');
        const innerContainerBottom = createElement('div', 'inner-container');
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

        innerContainerTop.appendChild(
            this.wrapped({elem: innerContainerBlockLeft, className: 'inner-container__block'}));
        innerContainerTop.appendChild(
            this.wrapped({elem: innerContainerBlockRight, className: 'inner-container__block'}));

        innerContainerBottom.appendChild(
            this.wrapped({elem: innerContainerBottomLeft, className: 'inner-container__block'}));
        innerContainerBottom.appendChild(
            this.wrapped({elem: innerContainerBottomRight, className: 'inner-container__block'}))

        container.appendChild(innerContainerTop);
        container.appendChild(innerContainerBottom);

        return container;
    }

    createTextInput(params = {}) {
        const container = createElement('fieldset', 'input-container');

        const label = this.createLabel(params.labelName);
        const input = createInput({ type: params.type, name: params.name });
        input.dataset['validation'] = params.validation;

        const errorMsg = this.createErrorMsg(params.errorMsg, 'error hidden');

        input.addEventListener('keyup', 
            debounce(this.saveTextInput.bind(this), 500)
        );

        container.appendChild(label);
        container.appendChild(input);
        container.appendChild(errorMsg);
        
        return container;
    }

    createRadioInput(params = {}) {
        const container = createElement('fieldset', 'radio-input-container');

        const label = this.createLabel(params.labelName);
        const input = createInput({type: params.type, name: params.name});
        input.value = params.value;

        input.addEventListener('change', 
            debounce(this.saveRadioInput.bind(this), 500)
        );

        container.appendChild(label);
        container.appendChild(input);

        return container;
    }

    createModificationDateElement() {
        const innerContainer = createElement('div', 'inner-container');
        const innerContainerBlock = createElement('div', 'inner-container__block');
        const span = createElement('span', 'modification-date modification-date-js');

        innerContainerBlock.appendChild(span);
        innerContainer.appendChild(innerContainerBlock);

        return innerContainer;
    }

    createLabel(textContent) {
        const label = createElement('label');
        label.textContent = textContent;

        return label;
    }

    createErrorMsg(msg, classNames) {
        const errorMsg = createElement('div', classNames);
        errorMsg.textContent = msg;

        return errorMsg;
    }

    createForm() {
        const form = createElement('form', 'invoice-form');
        return form;
    }

    wrapped(params = {}) {
        const container = createElement('div', params.className);
        container.appendChild(params.elem);

        return container;
    }
}