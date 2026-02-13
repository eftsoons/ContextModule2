import { configType } from "../config";

function verifyConfig(config: configType) {
  const errorEnv: string[] = [];

  for (const [key, objectValue] of Object.entries(config)) {
    const verify =
      typeof objectValue == "object" &&
      "verify" in objectValue &&
      objectValue.verify;

    const verifyFun =
      typeof objectValue == "object" &&
      "verifyFun" in objectValue &&
      typeof objectValue.verifyFun == "function" &&
      objectValue.verifyFun;

    const value: unknown =
      typeof objectValue == "object" ? objectValue.value : objectValue;

    if (
      (verifyFun && verifyFun(value)) ||
      (((typeof value == "string" && value.trim() == "") ||
        (typeof value == "number" && isNaN(value))) &&
        verify)
    ) {
      errorEnv.push(key);
    }
  }

  if (errorEnv.length != 0) {
    throw new Error(`В .env неправильно указано: ${errorEnv.join(", ")}.`);
  }
}

export default verifyConfig;
