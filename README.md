## Paydash
<img align="right" height="150" src="assets/images/charts.png">

> Paydash is the workers payment dashboard for Mahatma Gandhi National Rural Employment Guarantee Act(MGNREGA), an Indian labour law and social security measure that aims to guarantee the 'right to work'. Aim of paydash is to empower officers with relatime payment monitoring tool and reduce payment delays. 

## Technology

- **Hapi** - Server side framework
- **Handlebar** - HTML temnplating engine
- **Sequelize** - MYSQL database ORM
- **SASS** - CSS preprocessor 
- **D3** - Data visualization library
- **Gulp** - Javascript tasks automation
- **WebPack** - Assets pipeline

Note: For a detailed list of toolsets used in paydash, please refer to [package.json](package.json). 

## Application Structure

Let's take a tour of the app.
``
|-- app
|   |-- controllers    // Controllers are organised by module names
|   |   |-- <module_name> // Each controller defines config and handler for that route.
|   |
|   |-- helpers  // Helper functions used across application
|   |-- models   // All sequelize models are defined here
|   |-- routes  // All app routes are defined here
|   |   |-- <route_plugin>  // Each route module is a hapi plugin and can be toogled from config/manifest.js file.
|   |
|   `-- templates  // All server rendered handlebar templates, partials and helpers
|       |-- <module_name> // Templates are organised by module names.
|   
|-- assets // Contains all static resources 
|   |-- fonts    // Fonts used in application
|   |-- images   // Images used in application
|   |-- misc     // Misc resources used in application
|   |-- scripts  // Client javscripts files which are tehn packed by webpack
|   |-- styles   // All SASS styelsheets
|   |   |-- <module_name> // Styles are organised by module names. 
|   
|-- config // Contains all app configurations 
|   |   |-- keys // GA and other application keys are stored here. This folder is gitignored for security concerns.
|   |-- assets.js  // Assets configuration file 
|   |-- config.js  // Application configuratiin file which store all passwords etc. This file is gitignored. 
|   |-- manifest.js  // App manifest file listing all plugins and laod order. 
|   
|-- lib    // Core application lib/plugins 
|-- tasks  // Contains all gulp tasks 
|-- tests  // Code tests
|
|-- gulpfile.js // Gulp entry file 
|-- index.js  // Application starting point
|-- package.js  // Package configuration file
|-- server.js  // Main server file
``
## Code

We're using semi-colons and comma-last. No rhyme or reason; and some of the hapi [code convention guidelines](http://hapijs.com/styleguide).

## Running the server locally

 - Install  `node`, `npm`, `mongodb`
 - Ask an admin for a copy of `config.js` and place it in /config folder.
 - For running monitoring service ask admin for copy of Google analytics service account key file and place it in `config/keys/`
 - Run these commands

```sh

# install deps
npm install

# run the hapi server
gulp

```
The server should be running at [localhost:8000](https://localhost:8000).


