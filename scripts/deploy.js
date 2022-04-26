import shell from 'shelljs';
const packageInfo = require("../package.json");
const plugins = shell.env["REACTORY_PLUGINS"];
const client = shell.env["REACTORY_CLIENT"];
const server = shell.env["REACTORY_SERVER"];
const native = shell.env["REACTORY_NATIVE"];
const filename = `${packageInfo.name.replace("@", "").replace("/", "-")}-${packageInfo.version}.tgz`;

const source = `${plugins}/artifacts/${filename}`;
const dest = [
  `${client}`, 
  `${server}`,
];

dest.forEach((target) => {
  shell.cd(target);
  shell.echo(`Deploying lib to ${target}`);
  shell.exec(`rm -rf ${target}/node_module/@reactory`);
  shell.exec(`cp ${plugins}/artifacts/${filename} ${target}/lib/${filename}`);
  shell.exec(`npm i ${target}/lib/${filename}`);
});
