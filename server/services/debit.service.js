/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { getPool } = require('../config/database');

const date_time = new Date();

module.exports = {
  createDebitNote: (data, DebitInvoice, callback) => {
    getPool().query(
      'insert into debit_note(debit_invoice_id,vendor_id,org_id) value(?,?,?)',
      [DebitInvoice, data.vendor_id, data.org_id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },
  createDebitNoteCart: (data, callback) => {
    getPool().query(
      'insert into debit_note_cart_details(debit_invoice_id,product_id,batch_id_debit,pri_unit_debit,sec_unit_debit,total_debit) value(?,?,?,?,?,?)',
      [data.debit_invoice_no,
        data.product_id,
        data.batch_id_debit,
        data.pri_unit_debit,
        data.sec_unit_debit,
        data.total_debit],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
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
      JOIN sample spl ON inv.product_id = spl.product_id
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
      JOIN debit_note_cart_details dbdetails ON db.debit_invoice_id = dbdetails.debit_invoice_id
      Join vendor on db.vendor_id = vendor.vendor_id
      Join sample on dbdetails.product_id = sample.product_id
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

  searchDates: (orgId, from, to, callback) => {
    let querys;
    let datas = [];
    if (from && to) {
      const date = new Date(to);
      querys = 'WHERE debit_created_date >= ? AND debit_created_date < ?';
      datas = [
        from,
        new Date(date.getTime() + 86400000),
      ];
    } else if (from) {
      querys = 'WHERE debit_created_date >= ?';
      datas = [from];
    } else if (to) {
      const date = new Date(to);
      querys = 'WHERE debit_created_date < ?';
      datas = [new Date(date.getTime() + 86400000)];
    }

    getPool().query(
      `SELECT debitcart.*,vendor.vendor_name
      FROM debit_note_cart_details debitcart
      JOIN debit_note dn ON debitcart.debit_invoice_id = dn.debit_invoice_id
      JOIN vendor ON vendor.vendor_id = dn.vendor_id
      ${querys} and dn.org_id = ${orgId} 
      ORDER BY debit_created_date DESC`,
      datas,
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },
  searchMonth: (orgId, month, callback) => {
    getPool().query(
      `SELECT debitcart.*,vendor.vendor_name
      FROM debit_note_cart_details debitcart
      JOIN debit_note dn ON debitcart.debit_invoice_id = dn.debit_invoice_id
      JOIN vendor on vendor.vendor_id = dn.vendor_id
      where MONTH(debitcart.debit_created_date)=? and dn.org_id = ${orgId} 
      `,
      [
        month,
      ],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

  searchQuarter: (orgId, start, end, callback) => {
    getPool().query(
      `SELECT debitcart.*,vendor.vendor_name
      FROM debit_note_cart_details debitcart
      JOIN debit_note dn ON debitcart.debit_invoice_id = dn.debit_invoice_id
      JOIN vendor ON vendor.vendor_id = dn.vendor_id
      where MONTH(debitcart.debit_created_date)>=? and MONTH(debitcart.debit_created_date)<=? and dn.org_id = ${orgId} 
      `,
      [
        start,
        end,
      ],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

  searchYear: (orgId, year, callback) => {
    getPool().query(
      `SELECT debitcart.*,vendor.vendor_name
      FROM debit_note_cart_details debitcart
      JOIN debit_note dn ON debitcart.debit_invoice_id = dn.debit_invoice_id
      JOIN vendor ON vendor.vendor_id = dn.vendor_id
      where YEAR(debitcart.debit_created_date)=? and dn.org_id = ${orgId} 
      order by MONTH(debitcart.debit_created_date) DESC
      `,
      [
        year,
      ],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

};
