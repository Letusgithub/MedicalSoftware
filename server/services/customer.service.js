const { getPool } = require('../config/database');

let date_time=new Date();
let date = ("0" + date_time.getDate()).slice(-2);
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
let year = date_time.getFullYear();

let hours = date_time.getHours();
let minutes = date_time.getMinutes();
let seconds = date_time.getSeconds();

let cust_created_date = year+"-"+month+"-"+date+ " "+hours + ":" + minutes + ":" + seconds;
let cust_updated_date = year+"-"+month+"-"+date+" "+hours + ":" + minutes + ":" + seconds;


module.exports = {
    create: (data, callback) =>{
        getPool().query(
            `insert into customer_data(cust_name, cust_telephone, cust_address, cust_email, created_date)
                    values(?,?,?,?,?)`,
            [
                data.cust_name,
                data.cust_telephone,
                data.cust_address,
                data.cust_email,
                cust_created_date
            ],
            (error, results, fields) =>{
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    getUsers: (callback)=>{
        getPool().query(
            `select * from customer_data`,
            [],
            (error, results, fields)=>{
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    getUsersById: (customer_id, callback)=>{
        getPool().query(
            `select * from customer_data where customer_id =?`,
            [customer_id],
            (error, results, fields)=>{
                if(error){
                    return callback(error)
                }
                return callback(null, results[0])
            }
        )
    },

    updateUser: (id, data, callback)=>{
        getPool().query(
            `update customer_data set cust_name=?, cust_telephone=?, cust_address=?, cust_email=?, updated_date=? where customer_id =?`,
            [   
                data.cust_name,
                data.cust_telephone,
                data.cust_address,
                data.cust_email,
                cust_updated_date,
                id
            ],
            (error, results, fields)=>{
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    deleteUser: (id, data, callback)=>{
        getPool().query(
            `delete from customer_data where customer_id =?`,
            [id],
            (error, results, fields)=>{
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

}