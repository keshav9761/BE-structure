
function generateOTP2() {
    const genOTp = Math.floor(100000 + Math.random() * 9999).toString()
    return genOTp;
}

module.exports = {generateOTP2 };