import CryptoJS from 'crypto-js';
import keys from '../config/keys';

const encrypt = (value) => {
  console.log(keys.CRYPTO_JS_KEY);
  const encryptedvalue = CryptoJS.AES.encrypt(
    value,
    keys.CRYPTO_JS_KEY,
  ).toString();

  return encryptedvalue;
};

const decrypt = (value) => {
  const decryptedValue = CryptoJS.AES.decrypt(
    value,
    keys.CRYPTO_JS_KEY,
  ).toString(CryptoJS.enc.Utf8);

  return decryptedValue;
};

const cryptoJs = {
  encrypt,
  decrypt,
};

export default cryptoJs;
