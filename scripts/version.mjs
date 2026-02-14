/**
 * Script is used to generate a version number from the 
 * version file and update the package.json with incremental build numbers
 */
import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import shell from 'shelljs';

const PACKAGE_FILE = path.join(process.cwd(), 'package.json');
const VERSION_FILE = path.join(process.cwd(), '.version');

/**
 * Extracts the current build number from the package version
 * Expected format: major.minor.buildNumber (e.g., 1.1.42)
 */
function getCurrentBuildNumber() {
  const packageJSON = JSON.parse(fs.readFileSync(PACKAGE_FILE).toString());
  const versionParts = packageJSON.version.split('.');
  
  if (versionParts.length >= 3) {
    const buildNumber = parseInt(versionParts[2], 10);
    return isNaN(buildNumber) ? 0 : buildNumber;
  }
  
  return 0;
}

/**
 * Generates the next build number by incrementing the current one
 */
function generateBuildNumber() {
  const currentBuild = getCurrentBuildNumber();
  return currentBuild + 1;
}

/**
 * Updates the package.json with the next version number
 */
function getNextVersion() {
  // Read the version template
  const versionTemplate = fs.readFileSync(VERSION_FILE).toString().trim();
  const buildNumber = generateBuildNumber();
  const version = lodash.template(versionTemplate)({ buildNumber });
  
  // Update package.json
  const packageJSON = JSON.parse(fs.readFileSync(PACKAGE_FILE).toString());
  packageJSON.version = version;
  
  fs.writeFileSync(PACKAGE_FILE, JSON.stringify(packageJSON, null, 2) + '\n');
  console.log(`Updated version to: ${packageJSON.version}`);
  shell.exec(`export REACTORY_CORE_PACKAGE_FILENAME=reactory-reactory-core-${packageJSON.version}.tgz`);
}

/**
 * Reads the current version without updating it
 */
function readCurrentVersion() {
  const packageJSON = JSON.parse(fs.readFileSync(PACKAGE_FILE).toString());
  console.log(packageJSON.version);
  const result = shell.exec(`export REACTORY_CORE_PACKAGE_FILENAME=reactory-reactory-core-${packageJSON.version}.tgz`);
  console.log(result.stdout);
}

// Main execution
if (process.argv[2] === "--read") {
  readCurrentVersion();
} else {
  getNextVersion();
}
