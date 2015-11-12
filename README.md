## Paydash
### Workers Payment Dashboard

##### To run Paydash locally, please follow these steps:
1. Git glone and install dependencies
    ```sh
    $ git clone git@github.com:hks-epod/paydash.git
    $ cd paydash
    $ npm install
    ```
2. Ask an admin for a copy of `config.js` and place it in /config folder.
3. Edit the sequelize default section with your database credentials:
    ```
    $default: {
        username: username,
        password: password,
        database: 'nrega_payments',
        host: 'epodindia.cvthz0qudx9w.ap-southeast-1.rds.amazonaws.com',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
     ```
 4. Build the assets by running.
     ```sh
    $ gulp
     ```
     > If this command fails, you may need to install gulp globally.
     > Run:
     >
    ```sh
     $ npm install gulp -g
    ```
5. Run the app with `gulp` or `node server`.
6. Open your browser and navigate to http://localhost:8081/.

##### To deploy Paydash to Amazon Elastic Beanstalk, please follow these steps:
