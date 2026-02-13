import { configType } from "../config";

type configResultType = {
  [K in keyof configType]: configType[K] extends { value: infer V }
    ? V
    : configType[K];
};

function getConfigResult(config: configType) {
  return Object.fromEntries(
    Object.entries(config).map(([key, objectValue]) => [
      key,
      typeof objectValue == "object" ? objectValue.value : objectValue,
    ]),
  ) as configResultType;
}

export default getConfigResult;
