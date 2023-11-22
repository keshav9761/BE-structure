const jwt = require('jsonwebtoken');
const SECREAT_KEY = 'keshav'

exports.createJwtToken = (info, jwtCb) => {
    jwt.sign(info, SECREAT_KEY, jwtCb);
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

