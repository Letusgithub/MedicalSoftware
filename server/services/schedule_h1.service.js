const { getPool } = require("../config/database");

exports.scheduleH1 = (req, res) => {
  const query = `
    SELECT
        ci.product_name,
        ci.batch_name AS batch_no,
        ci.exp_date AS exp,
        ci.saled_pri_qty_cart + ci.saled_sec_qty_cart AS qty,
        od.customer_id AS customer,
        od.sales_created_date AS date,
        TIME(od.sales_created_date) AS time
    FROM
        cart_item ci
    JOIN
        order_details od ON ci.order_id = od.order_id
  `;

  getPool().query(query, (error, results, fields) => {
    if (error) {
      return res.status(500).send({ message: "Error fetching data", error });
    }
    res.send(results);
  });
};
