import '../styles/main.scss';

const note = document.createElement('h5');
note.textContent = 'Units converter';
document.body.appendChild(note);

// Units in meters
const units = [
    { name: 'meter', value: 1 },
    { name: 'kilometer', value: 1000 },
    { name: 'decimeter', value: 0.1 },
    { name: 'centimeter', value: 0.01 },
    { name: 'millimeter', value: 0.001 },
    { name: 'inch', value: 0.0254 },
    { name: 'foot', value: 0.3048 },
    { name: 'yard', value: 0.9144 },
    { name: 'mile', value: 1609.35 }
];

const container = createDiv('container');
const input1 = document.createElement('input');
const input2 = document.createElement('input');
input1.type = 'text';
input2.type = 'text';
const select1 = document.createElement('select');
const select2 = document.createElement('select');
document.body.appendChild(container);
container.appendChild(input1);
container.appendChild(select1);
container.appendChild(input2);
container.appendChild(select2);


units.forEach(unit => {
    const option1 = document.createElement('option');
    option1.value = unit.name;
    option1.textContent = unit.name;
    const option2 = option1.cloneNode(true);

    select1.appendChild(option1);
    select2.appendChild(option2);
});

input1.addEventListener('keyup', updateSecondValue);
select1.addEventListener('change', updateSecondValue);
input2.addEventListener('keyup', updateSecondValue);
select2.addEventListener('change', updateSecondValue);

function updateSecondValue() {
    let inputVal = parseFloat(input1.value);          
    if (isNaN(inputVal) || inputVal < 0) return;
    
    let val1, val2;
    
    if (select1.value === select2.value) {
        input2.value = inputVal;
        return;
    }

    units.forEach(unit => {
        if (unit.name === select1.value) {
            val1 = unit.value * inputVal;
        }
    });
    units.forEach(unit => {
        if (unit.name === select2.value) {
            val2 = val1 / unit.value;
        }
    });
    input2.value = val2;
}

function createDiv(className) {
    const div = document.createElement('div');
    div.classList.add(className);
    return div;
}




// To make hot-reloading available
if (module.hot) {
    module.hot.accept('./hot-print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}