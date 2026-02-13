const AllCodeInfo = {
  "US-10000": {
    codeResponse: 400,
    message: "Неправильные данные",
    description: "Неправильный формат данных",
  },
  "US-10100": { codeResponse: 409, message: "Ошибка почты" },
} as const;

type AllCodeInfoType = typeof AllCodeInfo;

type AllCodeInfoCode = keyof AllCodeInfoType;

type GetCodeResponse<T extends AllCodeInfoCode> =
  AllCodeInfoType[T]["codeResponse"];

type GetMessage<T extends AllCodeInfoCode> = AllCodeInfoType[T]["message"];

class globalError<
  T extends AllCodeInfoCode,
  C extends number = GetCodeResponse<T>,
  M extends string = GetMessage<T>,
> {
  code: AllCodeInfoCode;
  codeResponse: C;
  message: M;

  constructor(code: T, arg?: { codeResponse?: C; message?: M }) {
    this.code = code;

    this.codeResponse = (
      arg?.codeResponse != undefined
        ? arg.codeResponse
        : AllCodeInfo[code].codeResponse
    ) as C;

    this.message = (
      arg?.message != undefined ? arg.message : AllCodeInfo[code].message
    ) as M;
  }

  getResponse() {
    return {
      isSuccess: false,
      error: {
        code: this.code,
        message: this.message,
      },
    };
  }
}

type GlobalErrorType = typeof globalError;

export default globalError;
export type { GlobalErrorType };
