const service = require('../services/auth.service');

exports.registerOrg = (req, res) => {
    const data = req.body
    service.getByTel(data.org_telephone, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }
        if (results) {
            return res.json({
                success: 0,
                message: "Telephone number already exists"
            });
        }
        else {
            service.register(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
                else {
                    return res.status(200).json({
                        success: 1,
                        data: results
                    });
                }
            })
        }
    })
};
