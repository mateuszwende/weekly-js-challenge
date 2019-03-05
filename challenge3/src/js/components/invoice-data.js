import { InvoiceStorage } from "./invoice-storage";
import { composeDateStr } from '../lib/utils';

export class InvoiceData { 
    constructor(storedData) {
        this.storage = new InvoiceStorage();
        this.data = {
            customerName: null,
            customerSurname: null,
            customerCity: null,
            customerStreet: null,
            customerStrNumber: null,
            customerPostcode: null,
            companyName: null,
            companyNIP: null,
            companyCity: null,
            companyStreet: null,
            companyStrNumber: null,
            companyPostcode: null,
            payment: null,
            paymentStatus: null,
            modificationDate: null
        }

        this.getDataFromStorage(this.storage.readData()); 
    }

    getDataFromStorage(storedData) {
        if (storedData) {
            for (let prop in this.data) {
                for (let storedDataProp in storedData) {
                    if (prop === storedDataProp) {
                        this.data[prop] = storedData[storedDataProp];
                    }
                }
            }
        }
    } 

    writeDataToTextInputs(inputs) {
        for (let prop in this.data) {
            for (let i = 0; i < inputs.length; i++) {
                if (prop === inputs[i].name) {
                    inputs[i].value = this.data[prop];
                }
            }
        }
    }

    writeDataToRadioInputs(inputs) {
        for (let prop in this.data) {
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].value === this.data[prop]) {
                    inputs[i].checked = true;
                }
            }
        }
    }

    saveTextInput(input) {
        for (let prop in this.data) { 
            if (prop === input.name) {      
                this.data[prop] = input.value;
            }
        }

        this.saveModificationDate();
        this.storage.saveData(this.data);

    }

    saveRadioInput(input) {
        this.data['paymentStatus'] = input.value;

        this.saveModificationDate();
        this.storage.saveData(this.data);    
    }

    saveModificationDate() {
        this.data['modificationDate'] = new Date();
    }

    writeModificationDate(elem) {
        const date = new Date(this.data['modificationDate']);

        elem.textContent = `Recently modified: ${composeDateStr(date)}`;
    }
}