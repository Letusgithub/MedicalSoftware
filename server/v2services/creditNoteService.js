/* eslint-disable arrow-body-style */
const { executeTransaction } = require('../utils/transaction.util');
const batchModel = require('../v2models/batchModel');
const creditNoteItemModel = require('../v2models/creditNoteItemModel');
const creditNoteModel = require('../v2models/creditNoteModel');
const organisation = require('../v2models/organisationModel');

module.exports = {
  creditNoteEntry: async (data) => {
    return executeTransaction(async (connection) => {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear().toString().slice(-2);
      const returnDate = day + month + year;

      // Generate credit invoice number
      const pharmacyId = await organisation.getPharmacyId(connection, data.orgId);
      const totalResults = await creditNoteModel.getCreditCount(connection);
      const creditInvoiceNo = `${pharmacyId[0].org_id_main}CR${returnDate}${totalResults[0].total_rows + 1}`;

      // Create credit note
      await creditNoteModel.createCreditNote(connection, data, creditInvoiceNo);

      // Create credit note items and update batch
      const creditNoteItems = data.creditNoteItems;

      await Promise.all(
        creditNoteItems.map(async (item) => {
          creditNoteItemModel.createCreditNoteItem(connection, item, creditInvoiceNo);
          batchModel.updateBatchAfterCreditEntry(connection, item);
        }),
      );

      return creditInvoiceNo;
    });
  },
};
