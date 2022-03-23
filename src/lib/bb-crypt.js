const CryptoJS = require("crypto-js");
let password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY'

function encrypt(text) {
    let enc = CryptoJS.AES.encrypt(text, password).toString();
    return enc
}

function decrypt(encrypted) {
    let bytes  = CryptoJS.AES.decrypt(encrypted, password);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports =  {
  encrypt , decrypt
}