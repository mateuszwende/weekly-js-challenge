import { Storage } from "../lib/storage";

export class InvoiceStorage extends Storage {
    constructor() {
        super();
        this.dataKey = '_qwerty765_invoice';
    }
    
    saveData(obj) {
        this.writeValue(this.dataKey, obj);
    }
    
    readData() {
        return this.readValue(this.dataKey);
    }
}