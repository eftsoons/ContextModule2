function verifyJsonParse(data: string) {
  try {
    JSON.parse(data);

    return true;
  } catch {
    return false;
  }
}

export default verifyJsonParse;
