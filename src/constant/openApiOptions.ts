const options = {
  definition: {
    openapi: "3.0.0",
    title: "Backend",
    tags: [{ name: "main" }],
    info: {
      title: "Backend",
      version: "1.0.0",
      description: "API документация",
    },
    components: {
      schemas: {
        Response: {
          type: "object",
          properties: {
            isSuccess: { type: "boolean", const: true, default: true },
            result: {
              type: "object",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            isSuccess: { type: "boolean", const: false, default: false },
            error: {
              type: "object",
              properties: {
                code: { type: "string" },
                message: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        Response: {
          description: "Ответ",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Response",
              },
            },
          },
        },
        Error: {
          description: "Ошибка",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
};

export default options;
