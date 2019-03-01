import { objToArr } from '../lib/utils';

export class Units {
    constructor() {
        this.units = {
            'meter': { name: 'meter', scale: 1 },
            'kilometer': { name: 'kilometer', scale: 1000 },
            'decimeter' : { name: 'decimeter', scale: 0.1 },
            'centimeter': { name: 'centimeter', scale: 0.01 },
            'millimeter': { name: 'millimeter', scale: 0.001 },
            'inch': { name: 'inch', scale: 0.0254 },
            'foot' : { name: 'foot', scale: 0.3048 },
            'yard': { name: 'yard', scale: 0.9144 },
            'mile': { name: 'mile', scale: 1609.35 }
        };
    }

    getArr() {
        return objToArr(this.units);
    }

    convert(val, unit1, unit2) {
        return (val * this.units[unit1.toString()].scale) / this.units[unit2.toString()].scale;
    }
}