const jwt = require('jsonwebtoken');
const SECREAT_KEY = 'keshav'
const DEFAULT_EXPIRATION = "1d"
// "120" is equal to "120ms"
// "10h", "7d"
exports.createJwtToken = (info, expiresIn = DEFAULT_EXPIRATION) => {
    // info == Object
    return new Promise((resolve, reject) => {
        jwt.sign(info, SECREAT_KEY, { expiresIn }, (err, token) => {
            if (err) {
                reject(err)
            }
            resolve(token)
        });
    })
}

exports.decodeJwtToken = (token) => {

    return new Promise((resolve, reject) => {
        try {
            const decoded = jwt.verify(token, SECREAT_KEY);
            resolve(decoded)
        } catch (err) {
            reject(err)
        }
    })
}

// app.get('/das', (req, res) => {
//     const token = req.header('Authorization').split(' ')[1];
//     //console.log(token);
//     try {
//         const decoded = jwt.verify(token, SECREAT_KEY);
//         res.json({ user: decoded.userName });
//     } catch (err) {
//         res.status(401).json({ err: 'Unauthorized' });
//     }

// });

