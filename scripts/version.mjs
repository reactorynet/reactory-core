/**
 * Script is used to generate a version number from the 
 * version file and update the package.json
 */
import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import shell from 'shelljs';
import crypto from 'crypto';

const PACKAGE_FILE = path.join(process.cwd(), 'package.json');
const VERSION_FILE = path.join(process.cwd(), '.version');

function generateBuildNumber() {
  const currentDate = new Date();
  const commitHash = getCommitHash(); // Assuming you have a function to get the commit hash

  // Format the date and time
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  // Combine the formatted date and time with the commit hash
  const buildNumber = `${year}${month}${day}-${hours}${minutes}${seconds}-${commitHash}`;
  const hash = crypto.createHash('sha256')
  hash.update(buildNumber);
  return hash.digest('hex').substring(0,6);
}

function getCommitHash() {
  return shell.exec(`git rev-parse --short HEAD`).trim();
}


function getNextVersion() {
  //read in the version file
  const versionTemplate = fs.readFileSync(VERSION_FILE).toString();
  const version = lodash.template(versionTemplate)({ buildNumber: generateBuildNumber() });
  // write the version to package.json
  const packageJSON = JSON.parse(fs.readFileSync(PACKAGE_FILE).toString());
  packageJSON.version = version;
  
  fs.writeFileSync(PACKAGE_FILE, JSON.stringify(packageJSON, null, 2));
}

if (process.argv[2] === "--read") {
  const packageJSON = JSON.parse(fs.readFileSync(PACKAGE_FILE).toString());
  console.log(packageJSON.version);
  shell.exec(`export REACTORY_CORE_PACKAGE_FILENAME=reactory-reactory-core-${packageJSON.version}.tgz`);
} else {
  getNextVersion();
}
