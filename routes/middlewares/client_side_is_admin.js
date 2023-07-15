// This middleware adds the `isAdmin` variable to EJS renderers
module.exports = (req, res, next) => {
    res.locals.isAdmin = req.session.username === 'admin' ? true : false;
    next();
};

