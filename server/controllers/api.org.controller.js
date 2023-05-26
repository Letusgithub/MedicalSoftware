
const service = require('../services/org.service');

exports.updateOrg = (req, res) => {
    const data = req.body;
    service.update(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Record Not Found"
            });
        }

        return res.status(200).json({
            success: 1,
            message: "Updated successfully"
        });

    });
};

exports.deleteOrg = (req, res) => {
    const data = req.body;
    service.delete(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.json({
                ssuccess: 0,
                message: "Record Not Found"
            });
        }
        else {
            return res.status(200).json({
                success: 1,
                message: "Deleted successfully"
            });
        }
    })
};

