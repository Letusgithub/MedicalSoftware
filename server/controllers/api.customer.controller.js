const {
    create,
    getUsers,
    getUsersById,
    updateUser,
    deleteUser,
  } = require("../services/customer.service");
  
  module.exports = {
    createUser: (req, res) => {
      const body = req.body;
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Db error",
          });
        }
        else{
          console.log("new data",body);
          res.redirect('/customer_list')
        }
        // return res.status(200).json({
          //   success: 1,
          //   data: results,
          
          // });
        });
    },
  
    getUsersById: (req, res) => {
      const id = req.params.id;
      getUsersById(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
  
        if (!results) {
          return res.json({
            success: "0",
            message: "Record Not Found",
          });
        }
  
        return res.status(200).json({
          success: "gotuser",
          data: results,
        });
      });
    },
  
    getUsers: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(results);
        return res.status(200).json({
          success: 1,
          data: results,
        });
      });
    },
  
    updateUser: (req, res) => {
      const id = req.params.id;
      const body = req.body;
      updateUser(id, body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Updated:", results)
        res.redirect('/customer_list')
        // return res.status(200).json({
        //   success: 1,
        //   message: "Updated Succesfully",
        // });
      });
    },
  
    deleteUser: (req, res) => {
      const id = req.params.id;
      const data = req.body;
      deleteUser(id, data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
  
        if (!results) {
          return res.json({
            success: 0,
            message: "Record Not Found",
          });
        } 
        res.redirect('/customer_list')

        // return res.status(200).json({
        //   success: 1,
        //   message: "Deleted Succesfully",
        // });
      });
    },
  };