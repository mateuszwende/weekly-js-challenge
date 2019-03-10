export function createElement(selector, classNames) {
    if (!selector)
        throw Error("An Element must be composed of a selector.");

    const element = document.createElement(selector);

    if (classNames) {
        const classNamesArr = classNames.split(" ");
        classNamesArr.forEach(name => element.classList.add(name));
    }
  
    return element;    
}

export function createInput(params = {}) {
    if (!params.type || !params.name) {
        throw Error("When creating new Input element parameters type and name are required");
    }

    const input = document.createElement('input');
    input.type = params.type;
    input.name = params.name;

    if (params.placeholder) {
        input.placeholder = params.placeholder;
    }

    return input;
}

export function removeAllChilds(elem) {
    while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
    }
} 