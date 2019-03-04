import '../styles/main.scss';
import 'babel-polyfill';
import { InvoiceForm } from './components/invoice-form';


const invoiceForm = new InvoiceForm();



// To make hot-reloading available
if (module.hot) {
    module.hot.accept('./hot-print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}