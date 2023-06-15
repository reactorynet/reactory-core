import shell from 'shelljs';
import fs from 'fs';

const packageInfo = {
  name: process.env.npm_package_name,
  version: process.env.npm_package_version,
};

const plugins = shell.env["REACTORY_PLUGINS"];
const client = shell.env["REACTORY_CLIENT"];
const server = shell.env["REACTORY_SERVER"];
const native = shell.env["REACTORY_NATIVE"];
const filename = `${packageInfo.name.replace("@", "").replace("/", "-")}-${packageInfo.version}.tgz`;
const source = `${plugins}/artifacts/${filename}`;

const verbose = process.argv && process.argv.length > 0 && process.argv.indexOf("--verbose") > 0;

const dest = [
  `${client}`,
  `${server}`,
];

if (!fs.existsSync(source)) {
  shell.echo(`
  #### Error ####
  File "${filename}" was not found. Ensure the reactory-core module has been built and deployed.
  `)
  process.exit(404)
} else {
  shell.echo(`File found deploying library to locations `)
}

const logout = [];

const log = s => logout.push(s);

dest.forEach((target) => {
  shell.cd(target);
  shell.echo(`Deploying lib to ${target}`);
  if (!fs.existsSync(`${target}/lib`)) fs.mkdirSync(`${target}/lib`, { recursive: true });
  log(shell.exec(`rm -rf ${target}/node_module/@reactory`));
  log(shell.exec(`cp ${source} ${target}/lib/${filename}`));
  log(shell.exec(`npm i ${target}/lib/${filename} --save ${verbose ? '' : '--silent'}`));
});

if(verbose === true) {
  logout.forEach(s => console.log(s));
}

shell.echo(`Done!`);