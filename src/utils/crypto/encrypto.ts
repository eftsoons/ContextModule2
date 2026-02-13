import encryption from "../crypto/encryption";

function encrypto(data?: string) {
  if (data) {
    const dataEncryption = encryption(data);

    return `${dataEncryption.data}:${dataEncryption.iv}`;
  } else {
    return null;
  }
}

export default encrypto;
