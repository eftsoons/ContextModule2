import createdHashingSalt from "./createdHashingSalt";

function verifyHashSalt(dataVerify: string, data: string, salt: string) {
  return createdHashingSalt(data, salt).hash === dataVerify;
}

export default verifyHashSalt;
