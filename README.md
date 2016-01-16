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
```
|-- app
|   |-- controllers    // Controllers are organised by module names
|   |   |-- <module_name> // Each controller defines config and handler for that route.
|   |
|   |-- helpers  // Helper functions used across application
|   |-- models   // All sequelize models are defined here
|   |-- routes  // All app routes are defined here
|   |   |-- <route_plugin>  // Route module is a hapi plugin and can be toggled from config/manifest.js
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
|   |   |-- keys // GA and other application keys are stored here. (gitignored).
|   |-- assets.js  // Assets configuration file 
|   |-- config.js  // Application configuratiin file which store all passwords etc. (gitignore). 
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
```

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

## Contributers

[See the awesome people!](https://github.com/hks-epod/paydash/graphs/contributors)

#### License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

