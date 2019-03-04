export class Element {
    constructor(selector, className) {
        if (!selector)
            throw Error("An Element must be composed of a selector.");
        
        this.selector = selector.toString();
        this.element = document.createElement(this.selector);

        if (Array.isArray(className)) {
            className.forEach(name => {
                this.element.classList.add(name);
            })
            return this;
        }

        if (className) {
            this.element.classList.add(className);
        }
    }
 
    destroy() {
        document.removeChild(this.element);
    }
}