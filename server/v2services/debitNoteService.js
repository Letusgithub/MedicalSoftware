/* eslint-disable arrow-body-style */
const { executeTransaction } = require('../utils/transaction.util');
const debitNoteModel = require('../v2models/debitNoteModel');
const debitNoteItemModel = require('../v2models/debitNoteItemModel');
const batchModel = require('../v2models/batchModel');
const organisationModel = require('../v2models/organisationModel');

module.exports = {
  debitNoteEntry: async (data) => {
    return executeTransaction(async (connection) => {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear().toString().slice(-2);
      const returnDate = day + month + year;

      // Generate debit invoice number
      const pharmacyId = await organisationModel.getPharmacyId(connection, data.orgId);
      const totalResults = await debitNoteModel.getDebitNoteCount(connection);
      const debitInvoiceNo = `${pharmacyId[0].org_id_main}DB${returnDate}${totalResults[0].total_rows + 1}`;

      // Create debit note
      await debitNoteModel.createDebitNote(connection, data, debitInvoiceNo);

      // Create debit note items and update batch
      const debitNoteItems = data.debitNoteItems;

      await Promise.all(
        debitNoteItems.forEach(async (item) => {
          debitNoteItemModel.createDebitNoteItem(connection, item, debitInvoiceNo);
          batchModel.updateBatchAfterDebitEntry(connection, item);
        }),
      );

      return debitInvoiceNo;
    });
  },
};
