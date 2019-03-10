import '../styles/main.scss';
import 'babel-polyfill';
import { GiphySearcher } from './components/giphy-searcher';

document.addEventListener('DOMContentLoaded', () => new GiphySearcher());


// To make hot-reloading available
if (module.hot) {
    module.hot.accept('./hot-print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}