import '../styles/main.scss';
import { PrimeNumbers } from './components/prime-numbers';

document.addEventListener('DOMContentLoaded', () => new PrimeNumbers());







// To make hot-reloading available
if (module.hot) {
    module.hot.accept('./hot-print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}