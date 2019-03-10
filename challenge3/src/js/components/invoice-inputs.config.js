export const invoiceInputsConfig = {
    customer: {
        name: 
        {
            type: 'text', 
            name: 'customerName', 
            labelName: 'Name', 
            validation: 'text',
            errorMsg: 'The given value is not correct. Please try again.'
        },
        surname:
        {
            type: 'text', 
            name: 'customerSurname', 
            labelName: 'Surname', 
            validation: 'text',
            errorMsg: 'The given value is not correct. Please try again.'
        },
        city:
        {
            type: 'text', 
            name: 'customerCity', 
            labelName: 'City', 
            validation: 'text',
            errorMsg: 'The given value is not correct. Please try again.'
        },
        street:
        {
            type: 'text', 
            name: 'customerStreet', 
            labelName: 'Street', 
            validation: 'text',
            errorMsg: 'The given value is not correct. Please try again.'
        },
        strNumber:
        {
            type: 'text', 
            name: 'customerStrNumber', 
            labelName: 'Number', 
            validation: 'number',
            errorMsg: 'The given value is not correct. Please try again.'
        },
        postcode:
        {
            type: 'text', 
            name: 'customerPostcode', 
            labelName: 'Postcode', 
            validation: 'postcode',
            errorMsg: 'The given value is not correct. Please try again.'
        }            
    },
    company: {
        name:
        {
            type: 'text', 
            name: 'companyName', 
            labelName: 'Company name', 
            validation: 'notEmpty',
            errorMsg: 'The given value is not correct. Please try again.'
        },
        NIP:
        {
            type: 'text', 
            name: 'companyNIP', 
            labelName: 'NIP', 
            validation: 'nipCode',
            errorMsg: 'The given value is not correct. Please try again.'
        },
        city:
        {
            type: 'text', 
            name: 'companyCity', 
            labelName: 'City', 
            validation: 'text',
            errorMsg: 'The given value is not correct. Please try again.'
        },
        street:
        {
            type: 'text', 
            name: 'companyStreet', 
            labelName: 'Street', 
            validation: 'text',
            errorMsg: 'The given value is not correct. Please try again.'
        },
        strNumber:
        {
            type: 'text', 
            name: 'companyStrNumber', 
            labelName: 'Number', 
            validation: 'number',
            errorMsg: 'The given value is not correct. Please try again.'
        },
        postcode:
        {
            type: 'text', 
            name: 'companyPostcode', 
            labelName: 'Postcode', 
            validation: 'postcode',
            errorMsg: 'The given value is not correct. Please try again.'
        }     
    },
    payment:
    {
        type: 'number', 
        name: 'payment',
        labelName: 'Payment', 
        validation: 'number',
        errorMsg: 'The given value is not correct. Please try again.'
    },
    status: {
        written: 
        {
            type: 'radio',
            name: 'status',
            value: 'statusWritten',
            labelName: 'Written',
        },
        delivered: 
        {
            type: 'radio',
            name: 'status',
            value: 'statusDelivered',
            labelName: 'Delivered',
        },
        paid: 
        {
            type: 'radio',
            name: 'status',
            value: 'statusPaid',
            labelName: 'Paid',
        },
        delayed: 
        {
            type: 'radio',
            name: 'status',
            value: 'statusDelayed',
            labelName: 'Delayed',
        }
    }
}