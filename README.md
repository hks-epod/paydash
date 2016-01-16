## Paydash
<img align="right" height="150" src="assets/images/charts.png">

> Paydash is the workers payment dashboard for Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA), an Indian labour law and social security measure that aims to guarantee the 'right to work'. Aim of paydash is to empower officers with relatime payment monitoring tool and reduce payment delays. 

## Technology

- **Hapi** - Server side framework
- **Handlebar** - HTML temnplating engine
- **Sequelize** - MYSQL database ORM
- **SASS** - CSS preprocessor 
- **D3** - Data visualization library
- **Gulp** - Javascript tasks automation
- **WebPack** - Asset pipeline

Note: For a detailed list of toolsets used in paydash, please refer to [package.json](package.json). 

## Application Structure

Let's take a tour of the app.
```
|-- app
|   |-- controllers        // Controllers are organised by module names
|   |   |-- <module_name>  // Each controller defines config and handler for that route.
|   |
|   |-- helpers            // Helper functions used across application
|   |-- models             // All sequelize models are defined here
|   |-- routes             // All app routes are defined here
|   |   |-- <route_plugin> // Route module is a hapi plugin and can be toggled from config/manifest.js
|   |
|   `-- templates          // All server rendered handlebar templates, partials and helpers
|       |-- <module_name>  // Templates are organised by module names.
|   
|-- assets                 // Contains all static resources 
|   |-- fonts              // Fonts used in application
|   |-- images             // Images used in application
|   |-- misc               // Misc resources used in application
|   |-- scripts            // Client javscripts files which are tehn packed by webpack
|   |-- styles             // All SASS styelsheets
|   |   |-- <module_name>  // Styles are organised by module names. 
|   
|-- config                 // Contains all app configurations 
|   |   |-- keys           // GA and other application keys are stored here. (gitignored).
|   |-- assets.js          // Assets configuration file 
|   |-- config.js          // Application configuratiin file which store all passwords etc. (gitignore). 
|   |-- manifest.js        // App manifest file listing all plugins and laod order. 
|   
|-- lib                    // Core application lib/plugins 
|-- tasks                  // Contains all gulp tasks 
|-- tests                  // Code tests
|
|-- gulpfile.js            // Gulp entry file 
|-- index.js               // Application starting point
|-- package.js             // Package configuration file
|-- server.js              // Main server file
```

## Code

We're using semi-colons and comma-last. No rhyme or reason; and some of the hapi [code convention guidelines](http://hapijs.com/styleguide). All client side js code is also in commonJS pattern packes using webpack. Also please check out `.editorconfig`, `.jsbeautifyrc`, `.jshintrc` for some other code conventions used.

## Running the server locally

 - Install  `node`, `npm`
 - Place a copy of `config.js` in `/config` folder.
 - Monitoring services will require Google analytics service account key file placed in `config/keys/`
 - Run these commands

```sh
# Install deps
$ npm install

# Run the node server
$ npm start

# > paydash@1.0.0 start /Users/ravisuhag/Batcave/Workspace/Harvard/Dev/paydash
# > gulp
# 
# [16:48:55] Using gulpfile ~/Batcave/Workspace/Harvard/Dev/paydash/gulpfile.js
# [16:48:55] Starting 'fonts'...
# [16:48:56] Starting 'images'...
# [16:48:56] Starting 'misc'...
# [16:48:56] Starting 'styles'...
# [16:48:56] Finished 'styles' after 5.49 ms
# [16:48:56] Starting 'webpack'...
# [16:48:56] Finished 'webpack' after 73 ms
# [16:48:56] Starting 'lint'...
# [16:48:56] Starting 'nodemon'...
# [16:48:56] Finished 'nodemon' after 1.99 ms
# [16:48:56] [nodemon] v1.4.1
# [16:48:56] [nodemon] to restart at any time, enter `rs`
# [16:48:56] [nodemon] watching: *.*
# [16:48:56] [nodemon] starting `node server.js`
# [16:48:57] Finished 'images' after 1.98 s
# [16:48:57] Finished 'misc' after 1.98 s
# Server is listening on 8000

```
The server should be running at [localhost:8000](https://localhost:8000).

## Contributers

[See the awesome people!](https://github.com/hks-epod/paydash/graphs/contributors)
