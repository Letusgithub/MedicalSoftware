const service = require('../services/refer.service');

module.exports = {

    createRefer: (req, res) => {
        const data = req.body
        service.create ( data, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });             
            }
            else{
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }

        });
    },

}