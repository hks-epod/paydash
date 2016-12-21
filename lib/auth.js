'use strict';

exports.register = function(server, options, next) {

    const cache = server.cache({ segment: 'sessions', expiresIn: 24 * 60 * 60 * 1000 });
    server.app.cache = cache;

    server.auth.strategy('standard', 'cookie', {
        password: options.cookieSecret, // cookie secret
        cookie: options.cookieName, // Cookie name
        isSecure: false, // required for non-https applications
        clearInvalid: true,
        ttl: 24 * 60 * 60 * 1000, // Set session to 1 day
        redirectTo: '/login',
        validateFunc: function(request, session, callback) {

            var User = request.server.plugins.sequelize.db.User;

            User.findOne({
                where: {
                    id: session.id
                }
            }).then(function(user) {

                // If we didn't find the user return isValid=false.
                if (!user) {
                    return callback(null, false);
                }
                // Check id super_token is valid
                if (session.super_token !== user.super_token) {
                    return callback(null, false);
                }

                // Everything looks great
                return callback(null, true, session);

            });
        }
    });

    // Blacklist all routes.
    server.auth.default({
        strategy: 'standard',
        scope: ['district', 'block']
    });

    return next();

};

exports.register.attributes = {
    name: 'auth',
    dependencies: ['hapi-auth-cookie', 'sequelize']
};
