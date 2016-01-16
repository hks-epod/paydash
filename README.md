## Paydash
<img align="right" height="150" src="assets/images/charts.png">

> Paydash is a monitoring tool for block officials overseeing MGNREGA, India's employment guarantee programme for rural households. Beneficiaries under MGNREGA are supposed to be paid within 15 days of working, but the average worker waited 53 days to receive payment in 2014-2015, undermining MGNREGA's effectiveness as a social safety net. Paydash aims to reduce delays in beneficiary payments by providing government officials with detailed information on delays -- breaking out performance on payment sub-processes down to the panchayat level and connecting poor performance with the responsible government employee. In addition to diagnostics, Paydash is action-oriented, providing access to pending documents and the contact information of the responsible employee. Paydash aims to empower government officials with better information while introducing more accountability into the payments process, with the ultimate goal of helping MGNREGA workers receive their rightful payments.

Paydash is a joint initiative of the Ministry of Rural Development, the National Informatics Centre, and Evidence for Policy Design at Harvard Kennedy School.

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
|
| -- app
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

## Running tests
Lab is part of the hapi.js toolset and what we use to write all of our tests.

```
$ npm test
# > paydash@1.0.0 test /Users/ravisuhag/Batcave/Workspace/Harvard/Dev/paydash
# > node node_modules/lab/bin/lab -a code -t 100

# ..............

# 6 tests complete
# Test duration: 1628 ms
# No global variable leaks detected
# Coverage: 100.00%
```

## Contributers

[See the awesome people!](https://github.com/hks-epod/paydash/graphs/contributors)
