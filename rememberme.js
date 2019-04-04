
//configure 
passport.use(new RememberMeStrategy(
    function (token, done) {
        Token.consume(token, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
        });
    },
    function (user, done) {
        var token = utils.generateToken(64);
        Token.save(token, { userId: user.id }, function (err) {
            if (err) { return done(err); }
            return done(null, token);
        });
    }
));

//Authenticate the request
app.configure(function () {
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.authenticate('remember-me'));
    app.use(app.router);
});

//set cookie to the current user
app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function (req, res, next) {
        // issue a remember me cookie if the option was checked
        if (!req.body.remember_me) { return next(); }

        var token = utils.generateToken(64);
        Token.save(token, { userId: req.user.id }, function (err) {
            if (err) { return done(err); }
            res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
            return next();
        });
    },
    function (req, res) {
        res.redirect('/');
    });