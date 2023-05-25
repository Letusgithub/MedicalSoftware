const service = require('./emp.service');

module.exports = {

    createEmp: (req, res) => {
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

    updateEmp: (req, res) => {
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

    deleteEmp: (req, res) => {
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

    getEmpById: (req, res) => {
        const emp_id = req.params.id;
        service.getById ( emp_id, (err, results) => {
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

    getAllEmpsById: (req, res) => {
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