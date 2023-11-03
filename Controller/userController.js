const db = require('../Server')
const dbConfig = require('../Utilities/dbConfig')

const userDetail = (req, res) => {
    // const sql = 'SELECT * FROM  studentsmarks'
    // dbConfig.query(sql, (err, result) => {
    //     if (err) { console.log(err) }
    //     res.send(result)
    // })
    res.send({msg: 'Valid'})
}
module.exports = { userDetail }