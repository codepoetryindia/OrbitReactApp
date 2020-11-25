
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

    getPaymentTerms : function(obj, token) {
        var data = {
            params : obj
        }

        console.log(data);

        return axios.post(WEB_API + 'payment_terms/list/', data, {
            headers : {
                'Content-type': 'application/json',
                'user-token' : token,
            },
        })
    },
    getProducts : function(obj, token) {
        var data = {
            params : obj
        }

        console.log(data);

        return axios.post(WEB_API + 'product/search/', data, {
            headers : {
                'Content-type': 'application/json',
                'user-token' : token,
            },
        })
    },

    getProductCategories : function(obj, token) {
        var data = {
            params : obj
        }
        return axios.post(WEB_API + 'product/category', data, {
            headers : {
                'Content-type': 'application/json',
                'user-token' : token,
            },
        })
    },


    addProduct : function(obj, token) {
        var data = {
            params : obj
        }
        return axios.post(WEB_API + 'product', data, {
            headers : {
                'Content-type': 'application/json',
                'user-token' : token,
            },
        })
    },


    createInvoice : function(obj, token) {
        var data = {
            params : obj
        }

        console.log(JSON.stringify(data));

        return axios.post(WEB_API + 'customer/'+obj.partner_id+'/Bill', data, {
            headers : {
                'Content-type': 'application/json',
                'user-token' : token,
            },
        })
    },

    InvoiceUpdate : function(obj, token) {
        var data = {
            params : obj
        }

        console.log(JSON.stringify(data));
        return axios.post(WEB_API + 'update/customer/invoice/'+ obj.id , data, {
            headers : {
                'Content-type': 'application/json',
                'user-token' : token,
            },
        })
    },


    MakeInvoiceOpen : function(obj, token) {
        var data = {
            params : obj
        }

        console.log(JSON.stringify(data));
        return axios.post(WEB_API + 'invoice/confirm/'+ obj.id, data, {
            headers : {
                'Content-type': 'application/json',
                'user-token' : token,
            },
        })
    },


    MakeInvoicePaid : function(obj, token) {
        var data = {
            params : obj
        }
        console.log(JSON.stringify(data));
        return axios.post(WEB_API + 'invoice/paid/'+ obj.id, data, {
            headers : {
                'Content-type': 'application/json',
                'user-token' : token,
            },
        })
    },

    getTaxes : function(obj, token) {
        var data = {
            params : obj
        }
        return axios.post(WEB_API + 'taxes/search/', data, {
            headers : {
                'Content-type': 'application/json',
                'user-token' : token,
            },
        })
    },

    createCustomer : function(obj, token) {
        var data = {
            params : obj
        }
        return axios.post(WEB_API + 'customer', data, {
            headers : {
                'Content-type': 'application/json',
                'user-token' : token,
            },
        })
    },


}

export default InvoiceService