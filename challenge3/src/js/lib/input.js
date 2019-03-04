export const Input = (params = {}) => {
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