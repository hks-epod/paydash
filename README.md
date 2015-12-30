## Paydash

Workers Payment Dashboard

## Application Structure

Let's take a tour of the app.

### Assets

The [assets](assets) directory contains all the frontend stuff: JavaScript, stylesheets, images, fonts, robots.txt, favicon.ico, etc. The [web pack](tasks/webpack.js) [gulp process](gulpfile.js) watches this directory for file changes, and outputs everything to the [.build](.build) directory, which is [ignored by git](.gitignore) to prevent 

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
To run the server locally you should have `node`, `npm`, `mongodb` installed. You need to have copy of config file in `config/config.js` as well as GA key file in `config/keys/gakey.json`

```sh

# install deps
npm install

# run the hapi server
gulp

```
The server should be running at [localhost:8000](https://localhost:8000).


