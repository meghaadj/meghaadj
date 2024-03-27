import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ignore = ["create.js", "index.js", "script.js"];

const loadFolder = async (name) => {
  const folderPath = path.join(__dirname, `./${name}`);
  const files = await fs.readdirSync(folderPath);

  const schemas = [];

  for (const file of files) {
    if (ignore.includes(file)) continue;

    const filePath = path.join(folderPath, file);
    const schema = await import(filePath);
    schemas.push({ name: file.split(".js")[0], schema: schema.default });
  }

  return schemas;
};

export default loadFolder;
