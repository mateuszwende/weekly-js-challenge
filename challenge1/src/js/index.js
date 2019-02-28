import '../styles/main.scss';

const note = document.createElement('h6');
note.textContent = 'Write number from 0 to 10000. The program will display all prime numbers < value you give.'
document.body.appendChild(note);

const input = document.createElement('input');
document.body.appendChild(input);

input.addEventListener('keydown', e => {
    if (e.which === 13) {
        let inputValue = parseInt(input.value, 10);          
        if (!isNumber(inputValue) || inputValue < 0 || inputValue > 10000) return;

        const primeNumsArr = getArrPrimeNumsTo(inputValue);

        if (elementExists('prime-nums-container')) {
            destroyElement('prime-nums-container');
        }
        const primeNumsContainer = createDiv('prime-nums-container');

        primeNumsArr.forEach(num => {
            const p = document.createElement('p');
            p.textContent = num;
            primeNumsContainer.appendChild(p);
        });
        document.body.appendChild(primeNumsContainer);
    }
});

function isNumber(val) {
    return typeof val === "number"
}

function createDiv(className) {
    const div = document.createElement('div');
    div.classList.add(className);
    return div;
}

function elementExists(className) { 
    return document.querySelector(`.${className}`) ? true : false;
}

function destroyElement(className) {
    document.body.removeChild(document.querySelector(`.${className}`));
}

function getArrPrimeNumsTo(num) {
    let arr = [];
    for (let i = 2; i < num; i++) {
        let prime = true;
        for (let j = 2; j < i; j++) {
            if (i % j === 0) prime = false;
        }
        if (prime) arr.push(i);
    }
    return arr; 
}












if (module.hot) {
    module.hot.accept('./hot-print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}