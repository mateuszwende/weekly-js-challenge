import '../styles/main.scss';
import { UnitsConverter } from './components/units-converter';

document.addEventListener('DOMContentLoaded', () => new UnitsConverter());






// To make hot-reloading available
if (module.hot) {
    module.hot.accept('./hot-print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}