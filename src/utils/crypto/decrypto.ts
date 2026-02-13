import decryption from "../crypto/decryption";

function decrypto(data?: string) {
  if (data) {
    const [dataDecryption, dataIv] = data.split(":");

    if (dataDecryption && dataIv) {
      return decryption(dataDecryption, dataIv);
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export default decrypto;
