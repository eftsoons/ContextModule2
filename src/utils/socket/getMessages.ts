import { Entry } from "fast-glob";
import { parse } from "path";

async function getMessages(
  allFile: Entry[],
): Promise<{ name: string; fun: Function }[]> {
  const response = [];

  for (const file of allFile) {
    const { name } = parse(file.name);

    const moduleMessage = await import(file.path);

    if (
      typeof moduleMessage.default == "function" &&
      moduleMessage.default.name == "socketOn"
    ) {
      response.push({ name: name, fun: moduleMessage.default });
    }
  }

  return response;
}

export default getMessages;
