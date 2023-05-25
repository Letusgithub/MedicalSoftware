const service = require('./owner.service');

module.exports = {

    createOwner: (req, res) => {
        const data = req.body
        service.create ( data, (err, results) => {
            if (err) {
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

    updateOwner: (req, res) => {
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

    deleteOwner: (req, res) => {
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
    
    getOwnerById: (req, res) => {
        const org_id = req.params.id;
        service.getById ( org_id, (err, results) => {
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

}