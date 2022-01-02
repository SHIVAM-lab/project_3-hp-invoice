const fun = require('./function');

async function invoiceList() {
    try {
        var a = await fun.query_exec(`select * from nrm_doc_header`);
         console.log(a.length);
        var array = [];
        for (let i = 0; i < a.length; i++) {
            var check = await fun.query_exec(`select * from nrm_doc_type where doc_type_id = '${a[i].doc_type_id}'`);
            if (check[0].doc_type_prefix != 'INV') {
                 console.log(a[i].doc_received_date,`shivam`);
                var x = '',
                    y = '',
                    z = '',
                    q = '';
                var b = await fun.query_exec(`select * from nrm_business where business_id = '${a[i].business_id}'`);
                if (b.length != 0)
                    x = b[0].business_name;
                var c = await fun.query_exec(`select * from nrm_doc_status where doc_status_id ='${a[i].doc_status_id}'`);
                if (c.length != 0)
                    y = c[0].doc_status_name
                var d = await fun.query_exec(`select * from nrm_sites where site_id = '${a[i].site_id}'`);
                if (d.length != 0) {
                    z = d[0].site_name;
                    q = `${d[0].street_name} ${d[0].suburb_id}`;
                }
                var data = {
                    'invoice_number':a[i].invoice_number,
                    'customer_name': x,
                    'status': y,
                    'job_number': a[i].doc_code,
                    'doc_header_id': a[i].doc_header_id,
                    'site': z,
                    'invoice_date':a[i].doc_received_date
                }
                array[i] = data;
                console.log(data);
            }
        }
        console.log(array.length);
        return ({
            'status': 1,
            'data': array,
            'message': 'Invoice List Sent!',
            'error': null
        });
    } catch (error) {
        if (error) {
            console.log(error);
            return ({
                'status': 0,
                'message': 'Failed to send Invoice List!',
                'error': error
            });
        }
    }
}

module.exports = {
    invoiceList
}