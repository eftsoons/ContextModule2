import "dotenv/config";
import verifyConfig from "./utils/verifyConfig";
import getConfigResult from "./utils/getConfigResult";

type configType = typeof config;

/*
Пример - 
{
  key1: "asd", // без проверки
  key2: { value: "asd", verify: true }, // стандартная проверка
  key3: {
    value: "dsa",
    verifyFun: (value: unknown) => {
      return typeof value == "bigint";
    },
  }, // кастомная проверка
};
*/
const config = {
  port: { value: Number(process.env.PORT), verify: true },
  databaseUrl: { value: process.env.DATABASE_URL!, verify: true },
  frontendUrl: process.env.FRONTEND_URL!,
  token: { value: process.env.TOKEN!, verify: true },
  tokenCookie: { value: process.env.TOKEN_COOKIE!, verify: true },
  tokenMail: { value: process.env.TOKEN_MAIL!, verify: true },
  fromMail: process.env.FROM_MAIL!,
};

verifyConfig(config);

export const {
  frontendUrl,
  port,
  token,
  tokenCookie,
  databaseUrl,
  fromMail,
  tokenMail,
} = getConfigResult(config);

export type { configType };
