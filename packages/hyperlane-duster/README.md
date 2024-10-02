@owlprotocol/hyperlane-duster
=================

Watch Hyperlane Warp routes and dust recipients


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@owlprotocol/hyperlane-duster.svg)](https://npmjs.org/package/@owlprotocol/hyperlane-duster)
[![Downloads/week](https://img.shields.io/npm/dw/@owlprotocol/hyperlane-duster.svg)](https://npmjs.org/package/@owlprotocol/hyperlane-duster)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @owlprotocol/hyperlane-duster
$ hyperlane-duster COMMAND
running command...
$ hyperlane-duster (--version)
@owlprotocol/hyperlane-duster/0.0.0 linux-x64 node-v18.20.4
$ hyperlane-duster --help [COMMAND]
USAGE
  $ hyperlane-duster COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`hyperlane-duster hello PERSON`](#hyperlane-duster-hello-person)
* [`hyperlane-duster hello world`](#hyperlane-duster-hello-world)
* [`hyperlane-duster help [COMMAND]`](#hyperlane-duster-help-command)
* [`hyperlane-duster plugins`](#hyperlane-duster-plugins)
* [`hyperlane-duster plugins add PLUGIN`](#hyperlane-duster-plugins-add-plugin)
* [`hyperlane-duster plugins:inspect PLUGIN...`](#hyperlane-duster-pluginsinspect-plugin)
* [`hyperlane-duster plugins install PLUGIN`](#hyperlane-duster-plugins-install-plugin)
* [`hyperlane-duster plugins link PATH`](#hyperlane-duster-plugins-link-path)
* [`hyperlane-duster plugins remove [PLUGIN]`](#hyperlane-duster-plugins-remove-plugin)
* [`hyperlane-duster plugins reset`](#hyperlane-duster-plugins-reset)
* [`hyperlane-duster plugins uninstall [PLUGIN]`](#hyperlane-duster-plugins-uninstall-plugin)
* [`hyperlane-duster plugins unlink [PLUGIN]`](#hyperlane-duster-plugins-unlink-plugin)
* [`hyperlane-duster plugins update`](#hyperlane-duster-plugins-update)

## `hyperlane-duster hello PERSON`

Say hello

```
USAGE
  $ hyperlane-duster hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ hyperlane-duster hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/owlprotocol/workspace-public/blob/v0.0.0/src/commands/hello/index.ts)_

## `hyperlane-duster hello world`

Say hello world

```
USAGE
  $ hyperlane-duster hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ hyperlane-duster hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/owlprotocol/workspace-public/blob/v0.0.0/src/commands/hello/world.ts)_

## `hyperlane-duster help [COMMAND]`

Display help for hyperlane-duster.

```
USAGE
  $ hyperlane-duster help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for hyperlane-duster.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.13/src/commands/help.ts)_

## `hyperlane-duster plugins`

List installed plugins.

```
USAGE
  $ hyperlane-duster plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ hyperlane-duster plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.10/src/commands/plugins/index.ts)_

## `hyperlane-duster plugins add PLUGIN`

Installs a plugin into hyperlane-duster.

```
USAGE
  $ hyperlane-duster plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into hyperlane-duster.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the HYPERLANE_DUSTER_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the HYPERLANE_DUSTER_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ hyperlane-duster plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ hyperlane-duster plugins add myplugin

  Install a plugin from a github url.

    $ hyperlane-duster plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ hyperlane-duster plugins add someuser/someplugin
```

## `hyperlane-duster plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ hyperlane-duster plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ hyperlane-duster plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.10/src/commands/plugins/inspect.ts)_

## `hyperlane-duster plugins install PLUGIN`

Installs a plugin into hyperlane-duster.

```
USAGE
  $ hyperlane-duster plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into hyperlane-duster.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the HYPERLANE_DUSTER_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the HYPERLANE_DUSTER_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ hyperlane-duster plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ hyperlane-duster plugins install myplugin

  Install a plugin from a github url.

    $ hyperlane-duster plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ hyperlane-duster plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.10/src/commands/plugins/install.ts)_

## `hyperlane-duster plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ hyperlane-duster plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ hyperlane-duster plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.10/src/commands/plugins/link.ts)_

## `hyperlane-duster plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ hyperlane-duster plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hyperlane-duster plugins unlink
  $ hyperlane-duster plugins remove

EXAMPLES
  $ hyperlane-duster plugins remove myplugin
```

## `hyperlane-duster plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ hyperlane-duster plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.10/src/commands/plugins/reset.ts)_

## `hyperlane-duster plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ hyperlane-duster plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hyperlane-duster plugins unlink
  $ hyperlane-duster plugins remove

EXAMPLES
  $ hyperlane-duster plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.10/src/commands/plugins/uninstall.ts)_

## `hyperlane-duster plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ hyperlane-duster plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hyperlane-duster plugins unlink
  $ hyperlane-duster plugins remove

EXAMPLES
  $ hyperlane-duster plugins unlink myplugin
```

## `hyperlane-duster plugins update`

Update installed plugins.

```
USAGE
  $ hyperlane-duster plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.10/src/commands/plugins/update.ts)_
<!-- commandsstop -->
