// This middleware adds the `authenticated` variable to EJS renderers
module.exports = (req, res, next) => {
    res.locals.authenticated = req.session.username ? true : false;
    next();
};

