'use strict';

exports.register = function(server, options, next) {
    const cache = server.cache({ segment: 'sessions', expiresIn: 100 * 365 * 24 * 60 * 60 * 1000 });
    server.app.cache = cache;

    server.auth.strategy('standard', 'cookie', {
        password: options.cookieSecret, // cookie secret
        cookie: options.cookieName, // Cookie name
        isSecure: false, // required for non-https applications
        clearInvalid: true,
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
                if (user.deactivated) {
                    return callback(null, false);
                }
                if (user.scope === 'monitoring') {
                    return callback(null, true, session);
                }

                if (request.route.path.startsWith('/api/')) {
                    return callback(null, true, session);
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
        scope: ['state','district', 'block']
    });

    return next();
};

exports.register.attributes = {
    name: 'auth',
    dependencies: ['hapi-auth-cookie', 'sequelize']
};
