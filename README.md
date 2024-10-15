![Build Anything Fast](/branding/reactory-logo.png)
# Reactory Core

This project is a core project that contains environment variables, defaults, types for different environment runtimes.

When building this project make sure that you have configured the correct environment variable for where the reactory plugins folder resides.

Depending on your terminal you will need to add the following environment variables to your .zprofile or your .bashrc to export the `REACTORY_PLUGINS` environment variable. 

```bash
export REACTORY_HOME="$HOME/Projects/reactory"
export REACTORY_DATA="$REACTORY_HOME/reactory-data"
export REACTORY_SERVER="$REACTORY_HOME/reactory-server"
export REACTORY_CLIENT="$REACTORY_HOME/reactory-client"
export REACTORY_NATIVE="$REACTORY_HOME/reactory-native"
export REACTORY_PLUGINS="$REACTORY_DATA/plugins"
```
The reactory server, client and native client use these as reference and this must be built first.

To build and install the reactory-core library run the `npm run make-install` at the command prompt.

Once you have the server and client components checked out you can run the `npm run deploy-local` which will copy the library to the server and client /lib folders and then install it into the respective projects.

## Testing

The core library has only two tests, one that checks and confirms the reflection tooling is working and the other simply checks the version.

To run the test, run `npm run test`

For more information on reactory check out the reactory docs project.


***Disclaimer: The authors of this source code provide it "as is" without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the authors be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software. Use at your own risk.***