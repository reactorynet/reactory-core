![Build Anything Fast](/branding/reactory-logo.png)
# Reactory Core

It is highly advised to install [nvm](https://github.com/nvm-sh/nvm) as your node version manager.

Install nvm:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
or
```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

**Please refer to Reactory Server for dependency requirements**

This project is a core project that contains environment variables, defaults, types for different environment runtimes.

When building this project make sure that you have configured the correct environment variable for where the reactory plugins folder resides.

Depending on your terminal you will need to add the following environment variables to your .zprofile or your .bashrc to export the `REACTORY_PLUGINS` environment variable. 

```bash
export REACTORY_HOME="$HOME/Projects/reactory"
export REACTORY_DATA="$REACTORY_HOME/reactory-data"
export REACTORY_SERVER="$REACTORY_HOME/reactory-express-server"
export REACTORY_CLIENT="$REACTORY_HOME/reactory-pwa-client"
export REACTORY_NATIVE="$REACTORY_HOME/reactory-native"
export REACTORY_PLUGINS="$REACTORY_DATA/plugins"
```
The reactory server, client and native client use these as reference and this must be built first.

Install dependencies using `yarn install`.

To build and install the reactory-core library run the `yarn build:install` at the command prompt.

### Version Bumping

By default, `build:install` automatically increments the build number if uncommitted or unpushed changes are detected. To build and install without incrementing the version number, use:

```bash
yarn build:install:no-bump
```

This is useful when you want to rebuild the library without creating a new version.


## Testing

The core library has only two tests, one that checks and confirms the reflection tooling is working and the other simply checks the version.

To run the test, run `yarn test`

For more information on reactory check out the reactory docs project.


***Disclaimer: The authors of this source code provide it "as is" without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the authors be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software. Use at your own risk.***