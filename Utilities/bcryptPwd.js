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


module.exports = { generateHash }