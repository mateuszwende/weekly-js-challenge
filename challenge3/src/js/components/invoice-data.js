import { InvoiceStorage } from "./invoice-storage";

export class InvoiceData { 
    constructor(storedData) {
        this.storage = new InvoiceStorage();
        this.data = {
            customerName: '',
            customerSurname: '',
            customerCity: '',
            customerStreet: '',
            customerStrNumber: '',
            customerPostcode: '',
            companyName: '',
            companyNIP: '',
            companyCity: '',
            companyStreet: '',
            companyStrNumber: '',
            companyPostcode: '',
            payment: '',
            paymentStatus: ''
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
        this.storage.saveData(this.data); 
    }

    saveRadioInput(input) {
        this.data['paymentStatus'] = input.value;
        this.storage.saveData(this.data);
    }
}