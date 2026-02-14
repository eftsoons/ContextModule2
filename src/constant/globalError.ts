const AllCodeInfo = {
  "US-10000": {
    codeResponse: 422,
    message: "Invalid fields",
    fieldName: [],
  },
  "US-10100": {
    codeResponse: 403,
    message: "Forbidden for you",
    fieldName: [],
  },
  "US-10200": {
    codeResponse: 422,
    message: "Invalid data",
    fieldName: [],
  },
  "US-10300": {
    codeResponse: 404,
    message: "Not Found",
    fieldName: [],
  },
} as const;

type AllCodeInfoType = typeof AllCodeInfo;

type AllCodeInfoCode = keyof AllCodeInfoType;

type GetCodeResponse<T extends AllCodeInfoCode> =
  AllCodeInfoType[T]["codeResponse"];

type GetMessage<T extends AllCodeInfoCode> = AllCodeInfoType[T]["message"];

type GetFieldName<T extends AllCodeInfoCode> = AllCodeInfoType[T]["fieldName"];

class globalError<
  T extends AllCodeInfoCode,
  C extends number = GetCodeResponse<T>,
  M extends string = GetMessage<T>,
  Z extends readonly string[] | undefined | Object = GetFieldName<T>,
> {
  code: AllCodeInfoCode;
  codeResponse: C;
  message: M;
  fieldName: Z;

  constructor(code: T, arg?: { codeResponse?: C; message?: M; fieldName?: Z }) {
    this.code = code;

    this.codeResponse = (
      arg?.codeResponse != undefined
        ? arg.codeResponse
        : AllCodeInfo[code].codeResponse
    ) as C;

    this.message = (
      arg?.message != undefined ? arg.message : AllCodeInfo[code].message
    ) as M;

    this.fieldName = (
      arg?.fieldName != undefined
        ? arg.fieldName
        : AllCodeInfo[code].fieldName.length > 0
          ? { field_name: AllCodeInfo[code].fieldName }
          : undefined
    ) as Z;
  }

  getResponse() {
    const response = {
      message: this.message,
    };

    if (this.fieldName) {
      Object.assign(response, {
        errors: {
          ...this.fieldName,
        },
      });
    }

    return response;
  }
}

type GlobalErrorType = typeof globalError;

export default globalError;
export type { GlobalErrorType };
