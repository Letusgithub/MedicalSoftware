/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { getPool } = require('../config/database');

module.exports = {
  create: (data, invoiceId, callback) => {
    const date_time = new Date();
    const date = (`0${date_time.getDate()}`).slice(-2);
    const month = (`0${date_time.getMonth() + 1}`).slice(-2);
    const year = date_time.getFullYear();

    const hours = date_time.getHours();
    const minutes = date_time.getMinutes();
    const seconds = date_time.getSeconds();

    const order_created_date = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    const order_updated_date = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    getPool().query(
      `insert into order_details(customer_id, invoice_id_main, subtotal, total_dist, grand_total, mop, current_total, sales_created_date, doctor_name) 
                                    values(?,?,?,?,?,?,?,?,?)`,
      [
        data.customer_id,
        invoiceId,
        data.subtotal,
        data.total_dist,
        data.grand_total,
        data.mop,
        data.current_total,
        order_created_date,
        data.doctor_name,
      ],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },
  searchTotalSales: (orgId, month, year, callback) => {
    getPool().query(
      `SELECT COUNT(*) as total_rows FROM order_details od
      JOIN customer_data cd
      ON cd.customer_id = od.customer_id
      WHERE SUBSTRING(invoice_id_main, 20, 4) = ${month}${year} and cd.org_id =${orgId}
      `,
      [],
      (error, results) => {
        if (error) return callback(error);

        const totalCount = JSON.parse(results[0].total_rows);
        console.log(results);
        return callback(null, totalCount);
      },
    );
  },

  createNewMonth: (month, year, count, callback) => {
    getPool().query(

      `insert into sales_month_count(month, year, count)
      values(?,?,?)`,
      [
        month,
        year,
        count,
      ],
      (error, results) => {
        if (error) {
          console.log('error in createNewMonth', error);
        }
        return callback(null, results);
      },
    );
  },

  updateMonthCount: (month, year, count) => {
    getPool().query(

      'update sales_month_count set count=? where month=? and year =?',
      [
        count,
        month,
        year,
      ],
      (error, results) => {
        if (error) console.log('error in update month', error);
        console.log('results of update', results);
      },
    );
  },

  getMonthCount: (month, year, callback) => {
    getPool().query(
      'select * from sales_month_count where month=? and year =?',
      [
        month,
        year,
      ],
      (error, results) => {
        if (error) {
          console.log('error in getting count', error);
          return callback(error);
        }
        console.log('results of count', results);
        return callback(null, results);
      },
    );
  },

  getAllOrders: (id, callback) => {
    getPool().query(
      'select * from order_details where customer_id = ?',
      [id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },
  mainId: (id, callback) => {
    getPool().query(
      'select invoice_id_main from order_details where si_invoice_id = ?',
      [id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  getSalesIdforReport: (id, callback) => {
    getPool().query(
      'select si_invoice_id from order_details where invoice_id_main = ?',
      [id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },



  allSamples: (callback) => {
    getPool().query(
      'select * from sample',
      [],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  getInvoiceOrder: (salesId, orgId, callback) => {
    getPool().query(
      `select * from order_details od 
        join customer_data cd 
        on od.customer_id = cd.customer_id
        where od.si_invoice_id=? and cd.org_id = ?`,
      [salesId,
        orgId],
      (error, results) => {
        if (error) return callback(error);

        return callback(null, results);
      },
    );
  },
  invoiceSales: (salesId, orgId, callback) => {
    getPool().query(
      `select * from order_details od 
        join customer_data cd 
        on od.customer_id = cd.customer_id
        where od.invoice_id_main=? and cd.org_id = ?`,
      [salesId,
        orgId],
      (error, results) => {
        if (error) return callback(error);

        return callback(null, results);
      },
    );
  },

  getRevenue: (orgId, callback) => {
    getPool().query(
      `select * from order_details od
      JOIN customer_data cd 
      on cd.customer_id = od.customer_id 
      where cd.org_id = ${orgId}`,
      [],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  searchDates: (orgId, from, to, callback) => {
    let querys;
    let datas = [];
    if (from && to) {
      const date = new Date(to);
      querys = 'WHERE sales_created_date >= ? AND sales_created_date < ?';
      datas = [
        from,
        new Date(date.getTime() + 86400000),
      ];
    } else if (from) {
      querys = 'WHERE sales_created_date >= ?';
      datas = [from];
    } else if (to) {
      const date = new Date(to);
      querys = 'WHERE sales_created_date < ?';
      datas = [new Date(date.getTime() + 86400000)];
    }

    getPool().query(
      `SELECT * FROM order_details od
      JOIN customer_data cd 
      ON od.customer_id = cd.customer_id
      ${querys} and org_id = ${orgId} 
      ORDER BY sales_created_date DESC`,
      datas,
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

  searchMonth: (orgId, month, callback) => {
    getPool().query(
      `SELECT * FROM order_details od
      JOIN customer_data cd 
      ON od.customer_id = cd.customer_id
      where MONTH(od.sales_created_date)=? and org_id = ${orgId} 
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
      `SELECT * FROM order_details od
      JOIN customer_data cd 
      ON od.customer_id = cd.customer_id
      where MONTH(od.sales_created_date)>=? and MONTH(od.sales_created_date)<=? and org_id = ${orgId} 
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
      `SELECT * FROM order_details od
      JOIN customer_data cd 
      ON od.customer_id = cd.customer_id
      where YEAR(od.sales_created_date)=? and org_id = ${orgId} 
      order by MONTH(od.sales_created_date) DESC
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

  autoComplete: (querys, callback) => {
    const queries = querys.toLowerCase();
    getPool().query(
      'select * from sample where lower(med_name) like ? limit 10',
      [`%${queries}%`],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },

    );
  },
  // LEFT JOIN
  // customer_data AS cd ON cd.customer_id = od.customer_id
  // where cd.org_id = ?
  getTotalSumfromSales: (orgId, callback) => {
    console.log('service org', orgId);
    getPool().query(
      `SELECT
       CASE months.month
          WHEN 1 THEN 'Jan'
          WHEN 2 THEN 'Feb'
          WHEN 3 THEN 'Mar'
          WHEN 4 THEN 'Apr'
          WHEN 5 THEN 'May'
          WHEN 6 THEN 'Jun'
          WHEN 7 THEN 'Jul'
          WHEN 8 THEN 'Aug'
          WHEN 9 THEN 'Sept'
          WHEN 10 THEN 'Oct'
          WHEN 11 THEN 'Nov'
          WHEN 12 THEN 'Dec'
          END AS x,
          COALESCE(SUM(od.grand_total), 0) AS total
          FROM
              (SELECT 1 AS month UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
              UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8
              UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12) AS months
          LEFT JOIN
              order_details od ON MONTH(od.sales_created_date) = months.month
          LEFT JOIN
              customer_data cd ON cd.customer_id = od.customer_id
          where
              cd.org_id = ?
          GROUP BY
              months.month;
          `,
      [orgId],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },
    );
  },

  // salesMadePrevDay: (orgId, callback) => {
  //   getPool().query(
  //     `SELECT
  //     t1.order_date,
  //     t1.total_orders,
  //    ((t1.total_orders - t2.prev_total_orders) / t2.prev_total_orders) * 100 AS growth_percentage
  //   FROM
  //     (SELECT DATE(od.sales_created_date) AS order_date, COUNT(*) AS total_orders
  //      FROM newdata.order_details as od
  //      JOIN customer_data cd on cd.customer_id=od.customer_id where cd.org_id = ${orgId}
  //      GROUP BY DATE(od.sales_created_date)
  //      ORDER BY order_date) AS t1
  //   LEFT JOIN
  //     (SELECT DATE(od.sales_created_date) AS prev_order_date, COUNT(*) AS prev_total_orders
  //      FROM newdata.order_details as od
  //      JOIN customer_data cd on cd.customer_id=od.customer_id where cd.org_id = ${orgId}
  //      GROUP BY DATE(od.sales_created_date)
  //      ORDER BY prev_order_date) AS t2
  //   ON DATE_SUB(t1.order_date, INTERVAL 1 DAY) = t2.prev_order_date
  //   WHERE order_date=?

  //   `,
  //     [new Date().toJSON().slice(0, 10)],
  //     // [new Date('2023-06-25').toJSON()],
  //     (error, results) => {
  //       if (error) return callback(error);
  //       console.log('sales made prev day', results);
  //       return callback(null, results);
  //     },

  //   );
  // },

  salesMadePrevDay: (orgId, callback) => {
    getPool().query(
      `SELECT
       DATE(od.sales_created_date) AS date,
       COUNT(*) AS row_count
       FROM
        order_details as od
		  JOIN customer_data as cd
			  on cd.customer_id = od.customer_id
		    where cd.org_id = ?
      GROUP BY
          DATE(od.sales_created_date) 
		  order by DATE(od.sales_created_date) DESC limit 2
    `,
      [orgId],
      (error, results) => {
        if (error) return callback(error);
        console.log('sales made prev day', results);
        return callback(null, results);
      },

    );
  },

  // salesMadePrevMonth: (callback) => {
  //   getPool().query(
  //     `SELECT
  //     DATE_FORMAT(newdata.order_details.sales_created_date, '%Y-%m') AS order_month,
  //     COUNT(*) AS total_orders,
  //     ((COUNT(*) - t2.prev_total_orders) / t2.prev_total_orders) * 100 AS growth_percentage
  //   FROM
  //     newdata.order_details
  //   LEFT JOIN
  //      (SELECT DATE_FORMAT(newdata.order_details.sales_created_date, '%Y-%m') AS prev_order_month, COUNT(*) AS prev_total_orders
  //      FROM newdata.order_details
  //      WHERE newdata.order_details.sales_created_date < DATE_FORMAT(NOW(), '%Y-%m-01')
  //      GROUP BY DATE_FORMAT(newdata.order_details.sales_created_date, '%Y-%m')
  //      ORDER BY prev_order_month) AS t2
  //   ON DATE_FORMAT(newdata.order_details.sales_created_date, '%Y-%m') = t2.prev_order_month
  //   WHERE newdata.order_details.sales_created_date >= DATE_FORMAT(NOW(), '%Y-%m-01')
  //   GROUP BY DATE_FORMAT(newdata.order_details.sales_created_date, '%Y-%m'), t2.prev_total_orders
  //   ORDER BY order_month
  //   `,
  //     [],
  //     (error, results) => {
  //       if (error) return callback(error);
  //       return callback(null, results);
  //     },

  //   );
  // },

  salesMadePrevMonth: (orgId, callback) => {
    getPool().query(
      `SELECT
      MONTH(od.sales_created_date) AS date,
      COUNT(*) AS row_count
      FROM
       order_details as od
     JOIN customer_data as cd
       on cd.customer_id = od.customer_id
       where cd.org_id = ?
     GROUP BY
         MONTH(od.sales_created_date) 
     order by MONTH(od.sales_created_date) DESC limit 2
    `,
      [orgId],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },

    );
  },

  // salesMadePrevYear: (callback) => {
  //   getPool().query(
  //     `SELECT
  //     YEAR(sales_created_date) AS order_year,
  //     COUNT(*) AS total_orders,
  //     ((COUNT(*) - t2.prev_total_orders) / t2.prev_total_orders) * 100 AS growth_percentage
  //   FROM
  //     order_details
  //   LEFT JOIN
  //     (SELECT YEAR(sales_created_date) AS prev_order_year, COUNT(*) AS prev_total_orders
  //      FROM order_details
  //      WHERE sales_created_date < DATE_FORMAT(NOW(), '%Y-01-01')
  //      GROUP BY YEAR(sales_created_date)
  //      ORDER BY prev_order_year) AS t2
  //   ON YEAR(sales_created_date) = t2.prev_order_year
  //   WHERE sales_created_date >= DATE_FORMAT(NOW(), '%Y-01-01')
  //   GROUP BY YEAR(sales_created_date), t2.prev_total_orders
  //   ORDER BY order_year
  //   `,
  //     [],
  //     (error, results) => {
  //       if (error) return callback(error);
  //       return callback(null, results);
  //     },

  //   );

  salesMadePrevYear: (orgId, callback) => {
    getPool().query(
      `SELECT
      YEAR(od.sales_created_date) AS date,
      COUNT(*) AS row_count
      FROM
       order_details as od
     JOIN customer_data as cd
       on cd.customer_id = od.customer_id
       where cd.org_id = ?
     GROUP BY
         YEAR(od.sales_created_date) 
     order by YEAR(od.sales_created_date) DESC limit 2
    `,
      [orgId],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      },

    );
  },

};
