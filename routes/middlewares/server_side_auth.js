// Middleware to prevent unauthorized access 
module.exports = (req, res, next) => {
    if (!req.session.username) {
        return res.status(401).render("unauthorized.ejs");
    }

    // If the user is authenticated, proceed to the next middleware or route handler
    next();
};