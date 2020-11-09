
import axios from 'axios';
import { WEB_API } from '../utils/keyInfo'

const headers = {
    ContentType: 'application/json',
};

const param = {
    params : {

    }
}
var InvoiceService = {

    getDashboard : function(obj, token) {
        var data = {
            params : obj
        }
        return axios.post(WEB_API + 'dashboard', data, {
            headers : {
                'Content-type': 'application/json',
                'user-token' : token,
            },
        })
    },

    getCustomers : function(obj, token) {
        var data = {
            params : obj
        }

        console.log(data);

        return axios.post(WEB_API + 'customer/search', data, {
            headers : {
                'Content-type': 'application/json',
                'user-token' : token,
            },
        })
    },

    getInvoices : function(obj, token) {
        var data = {
            params : obj
        }

        console.log(data);

        return axios.post(WEB_API + 'customer_invoices/search', data, {
            headers : {
                'Content-type': 'application/json',
                'user-token' : token,
            },
        })
    },

    getBills : function(obj, token) {
        var data = {
            params : obj
        }

        console.log(data);

        return axios.post(WEB_API + 'vendor_bill/search', data, {
            headers : {
                'Content-type': 'application/json',
                'user-token' : token,
            },
        })
    },
}

export default InvoiceService