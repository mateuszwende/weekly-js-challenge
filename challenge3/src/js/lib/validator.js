export class Validator {
    constructor() {
        this.postcodePattern = /^\d\d-\d\d\d$/;
        this.nipPattern = /^[1-9]\d\d-?\d\d\d-?\d\d-?\d\d$/;
        this.numberPattern = /^((-|\+)?\d+([\.,]\d+)?)$/;
        this.stringPattern = /^[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż\s]*$/;
    }

    isValid(val, pattern) {
        return pattern.test('' + val)
    }

    isPostcodeValid(postalCode) {
        return this.isValid(postalCode, this.postcodePattern);
    }

    isNipValid(nipCode) {
        return this.isValid(nipCode, this.nipPattern);
    }

    isNumberValid(number) {
        return this.isValid(number, this.numberPattern);
    }

    isTextString(text) {
        return this.isValid(text, this.stringPattern);
    }

    isNotEmpty(text) {
        return (text.length > 0);
    }
}