const checkSymbol = ["_", "#", "!", "%"];

function checkPassword(password: string) {
  const passwordCheck = password.split("");

  if (
    passwordCheck.length >= 3 &&
    passwordCheck.some((char) => char.toLowerCase() == char) &&
    passwordCheck.some((char) => char.toUpperCase() == char) &&
    passwordCheck.some((char) => !isNaN(Number(char))) &&
    passwordCheck.some((char) => checkSymbol.includes(char))
  ) {
    return true;
  }

  return false;
}

export default checkPassword;
