const bcrypt = require('bcrypt')


const generateHash = (password) => {

    return new Promise((resolve, reject) => {

        bcrypt.hash(password, 5, (err, hash) => {
            if (err) {
                reject(err)
            }

            resolve(hash)
        })


    })

}

const compaireBcrypt = (password, hashedPassword) => {
    return new Promise((reslove, reject) => {
        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
            if (err) {
                reject(err);
            }
            reslove(isMatch)
        })
    })



}


module.exports = { generateHash, compaireBcrypt }