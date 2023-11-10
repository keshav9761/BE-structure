const dbConfig = require('../Utilities/dbConfig')

// Custom validation callback
exports.userExist = (req, res, next) => {

    if (req.validationErrors) {
        // Handle validation errors or perform custom logic
        return res.status(400).json({ errors: req.validationErrors });
      }

    const sql = `SELECT * FROM users WHERE email='${req.body.email}'`;
    
    dbConfig.query(sql, (err, result) => {
        if (err) {
            return next(err);
        }
        else if(result?.length) {
           return next({statusCode: 400, error:"User Already Exist!"});
        } else {
            next()
        }
    });
   
  }