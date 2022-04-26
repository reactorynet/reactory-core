# reactory-core

This project is a core project that contains environment variables, defaults, types for different environment runtimes.

When building this project make sure that you have configured the correct environment variable for where the reactory plugins folder resides.

Depending on your terminal you will need to add the following environment variables to your .zprofile or your .bashrc to export the `REACTORY_PLUGINS` environment variable. 

    export REACTORY_DATA ="$HOME/Projects/reactory/reactory-data"
    export REACTORY_PLUGINS="$REACTORY_DATA/plugins"

The reactory server, client and native client use these as reference and this must be built first.

To build and install the reactory-core library run the `npm run make-install` at the command prompt.

