const service = require('./refer.service');

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

    updateRefer: (req, res) => {
        const data = req.body;
        service.update ( data, (err, results) => {
            if(err){
                console.log(err);
                return;             
            }
            if (!results){
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                })
            }
            else{
                return res.status(200).json({
                    success: 1,
                    message: "Updated successfully"
                });
            }
        });
    },

    deleteRefer: (req, res) => {
        const data = req.body;
        service.delete ( data, (err, results) => {
             if(err){
                 console.log(err);
                 return;             
             }
             if (!results) {
                 return res.json({
                     ssuccess:0,
                     message: "Record Not Found"
                 });
             }
             else{
                 return res.status(200).json({
                     success: 1,
                     message: "Deleted successfully"
                 });
             }
        })
    },

    getReferById: (req, res) => {
        const refer_id = req.params.id;
        service.getById ( refer_id, (err, results) => {
            if(err){
                console.log(err);
                return;             
            }
            if (!results) {
                return res.json({
                    ssuccess:0,
                    message: "Record Not Found"
                });
            }
            else{
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            } 
        })
    },

    getAllRefersById: (req, res) => {
        const org_id = req.params.id
        service.getAllById ( org_id, (err, results) => {
            if(err){
                console.log(err);
                return;             
            }
            if (!results) {
                return res.json({
                    ssuccess:0,
                    message: "Records Not Found"
                });
            }
            else{
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            } 
        })
    },
}