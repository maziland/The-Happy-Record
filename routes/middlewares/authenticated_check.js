module.exports = (req, res, next) => {
    res.locals.authenticated = req.session.username ? true : false;
    next();
};

