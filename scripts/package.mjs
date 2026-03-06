import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
const PACKAGE_FILE = path.join(process.cwd(), 'package.json');
const plugins = shell.env["REACTORY_PLUGINS"];
const getFilename = () => {
  const packageJSON = JSON.parse(fs.readFileSync(PACKAGE_FILE).toString());
  const filename = `${packageJSON.name.replace("@", "").replace("/", "-")}-${packageJSON.version}.tgz`;
  return `${plugins}/artifacts/${filename}`;
};
const result = shell.exec(`yarn pack --filename ${getFilename()}`);
shell.echo(result.stdout);
