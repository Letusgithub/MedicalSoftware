/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { getPool } = require('../config/database');
const date_time = new Date();

module.exports = {
    createDebitNote: (data,DebitInvoice,callback) =>{
        getPool().query(
            'insert into debit_note(debit_invoice_id,vendor_id,org_id) value(?,?,?)',
            [DebitInvoice,data.vendor_id,data.org_id],
            (error,results)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results);
            },
        );
    },
    createDebitNoteCart: (data,callback) =>{
        getPool().query(
            'insert into debit_note_cart_details(debit_invoice_no,product_id,batch_id_debit,pri_unit_debit,sec_unit_debit,total_debit) value(?,?,?,?,?,?)',
            [data.debit_invoice_no,data.product_id,data.batch_id_debit,data.pri_unit_debit,data.sec_unit_debit,data.total_debit],
            (error,results)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results);
            },

        );
    },
    getTotalDebitNotes: (callback) => {
        getPool().query(
          'SELECT COUNT(*) as total_rows FROM debit_note',
          [],
          (error, results) => {
            if (error) return callback(error);
            const totalCount = JSON.parse(results[0].total_rows);
            return callback(null, totalCount);
          },
        );
      },

    // get all inventory details in credit ejs
  getINVDetailsinDebitNote: (orgId, callBack) => {
    getPool().query(
      `SELECT * FROM inventory inv
      JOIN sample spl ON inv.product_id = spl.sample_id
      where inv.org_id= ?
      `,
      [
        orgId,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },

  getDebitNoteinInvoice: (id, callBack) => {
    getPool().query(
      `SELECT DISTINCT vendor.*, dbdetails.*, inv.hsn, inv.gst, batch.batch_name, batch.exp_date, batch.mrp,  sample.med_name FROM debit_note db
      JOIN debit_note_cart_details dbdetails ON db.debit_invoice_id = dbdetails.debit_invoice_no
      Join vendor on db.vendor_id = vendor.vendor_id
      Join sample on dbdetails.product_id = sample.sample_id
      Join batch on batch.batch_id = dbdetails.batch_id_debit 
      Join inventory inv on inv.product_id = dbdetails.product_id
      where db.debit_invoice_id = ?
      `,
      [
        id,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },
  
    
};