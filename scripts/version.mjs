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
 * Checks if there are uncommitted changes in the repository
 */
function hasUncommittedChanges() {
  const result = shell.exec('git status --porcelain', { silent: true });
  return result.code === 0 && result.stdout.trim().length > 0;
}

/**
 * Checks if there are unpushed commits on the current branch
 */
function hasUnpushedCommits() {
  // Get the current branch name
  const branchResult = shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true });
  if (branchResult.code !== 0) {
    return false;
  }
  
  const branch = branchResult.stdout.trim();
  
  // Check if there are commits that haven't been pushed
  const result = shell.exec(`git log origin/${branch}..HEAD`, { silent: true });
  
  // If the command fails (e.g., no upstream), consider it as having changes
  if (result.code !== 0) {
    return true;
  }
  
  return result.stdout.trim().length > 0;
}

/**
 * Determines if the build number should be incremented
 */
function shouldIncrementVersion() {
  const uncommitted = hasUncommittedChanges();
  const unpushed = hasUnpushedCommits();
  
  if (uncommitted || unpushed) {
    console.log(`Version will be incremented (uncommitted: ${uncommitted}, unpushed: ${unpushed})`);
    return true;
  }
  
  console.log('No changes detected - version will remain the same');
  return false;
}

/**
 * Generates the next build number by incrementing the current one
 * Only increments if there are uncommitted or unpushed changes
 */
function generateBuildNumber() {
  const currentBuild = getCurrentBuildNumber();
  
  if (shouldIncrementVersion()) {
    return currentBuild + 1;
  }
  
  return currentBuild;
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
