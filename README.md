## Paydash
<img align="right" height="200" src="assets/images/charts.png">

> Paydash is the workers payment dashboard for Mahatma Gandhi National Rural Employment Guarantee Act(MGNREGA), an Indian labour law and social security measure that aims to guarantee the 'right to work'. Aim of paydash is to empower officers with relatime payment monitoring tool and reduce payment delays. 

### Technology

- Hapi - Server side framework
- Handlebar - HTML temnplating engine
- Sequelize - MYSQL database ORM
- SASS - CSS preprocessor 
- D3 - Data visualization library
- Gulp - Javascript tasks automation
- WebPack - Assets pipeline

Note: For a detailed list of toolset used in paydash, please refer to [package configuration file](package.json). 

## Application Structure

Let's take a tour of the app.

### Assets

The [assets](assets) directory contains all the frontend stuff: JavaScript, stylesheets, images, fonts, robots.txt, favicon.ico, etc. The [web pack](tasks/webpack.js) [gulp process](gulpfile.js) watches this directory for file changes, and outputs everything to the [.build](.build) directory, which is [ignored by git](.gitignore) to prevent automated version control noise.

- Web pack [assets/scripts/index.js](assets/scripts/index.js)

### Styles

We're using SASS, a CSS preprocessor.

[assets/styles/index.styl](assets/styles/index.scss) is the master stylesheet, which is converted by the  [gulp process](gulpfile.js) to .build/css/index.css.

### Templates

We're using [Handlebars](http://handlebarsjs.com/) as our templating engine. Server-rendered templates live in [app/templates](app/templates).

### Partials

Handlebars partials are handy for markup that is needed in more than one place. All the partials are located in [app/templates/partials](app/templates/partials). Every `.hbs` file in the partials directory becomes avaiable in all handlebars templates.

### Routes

Every route in the application is defined in [app/routes](app/routes)

### Controllers

Every controller in the application is defined in [app/controllers](app/controllers). Each controller defines config and handler for that route. [Refer](http://hapijs.com/api#route-handler)

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


