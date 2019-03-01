export class Element {
    constructor(selector, className) {
        if (!selector)
            throw Error("An Element must be composed of a selector.");
        
        this.selector = selector.toString();
        this.element = document.createElement(this.selector);
        if (className) {
            this.element.classList.add(className);
        }
    }

    destroy() {
        document.removeChild(this.element);
    }
}