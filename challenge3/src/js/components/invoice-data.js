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
            status: null,
            modificationDate: null
        }

        this.getDataFromStorage(this.storage.readData()); 
    }

    getDataFromStorage(storedData) {
        if (storedData) {
            for (const key in this.data) {
                for (const storedDataKey in storedData) {
                    if (key === storedDataKey) {
                        this.data[key] = storedData[storedDataKey];
                    }
                }
            }
        }
    }
    
    writeDataToInputs(inputs) {
        for (const key in this.data) {
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].type === 'radio') {
                    if (inputs[i].value === this.data[key]) {
                        inputs[i].checked = true;
                        break;
                    }
                }
                else {
                    if (inputs[i].name === key) {
                        inputs[i].value = this.data[key];
                        break;
                    }   
                }   
            }
        }
    }

    saveInput(input) {
        for (const key in this.data) { 
            if (key === input.name) {      
                this.data[key] = input.value;
            }
        }

        this.saveModificationDate();
        this.storage.saveData(this.data);

    }

    saveRadioInput(input) {
        this.data['status'] = input.value;

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