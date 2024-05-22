/* eslint-disable import/no-extraneous-dependencies */
const puppeteer = require('puppeteer');
const path = require('path');
const ejs = require('ejs');
const moment = require('moment');
const { getSalesReceipt } = require('../services/v2-receipt.service');

module.exports = {
  getSalesReceipt: async (req, res) => {
    const orderId = req.params.id;
    try {
      const salesReceipt = await getSalesReceipt(orderId);
      res.status(200).json({
        success: true,
        data: salesReceipt,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  getSalesReceiptPDF: async (req, res) => {
    const orderId = req.params.id;
    try {
      const salesReceipt = await getSalesReceipt(orderId);

      // Generate HTML content from data using EJS template
      const template = path.resolve(__dirname, '../views/template/sale_receipt.ejs');
      const html = await ejs.renderFile(template, { data: salesReceipt, moment });

      // Launch puppeteer and generate PDF
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.setContent(html);

      const pdf = await page.pdf({ format: 'A4' });
      await browser.close();

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=sales-receipt.pdf');
      res.send(pdf);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
