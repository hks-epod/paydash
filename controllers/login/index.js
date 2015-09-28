'use strict';


var passport = require('passport');

module.exports = function(router) {

    router.get('/', function(req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/profile');
        } else {
            //Include any error messages that come from the login process.
            var ctx = {};
            ctx.messages = req.flash('error');
            res.render('login', ctx);
        }

    });

    router.post('/', function(req, res) {

        passport.authenticate('local', {
            successRedirect: req.session.goingTo || '/profile',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res);

    });

};
