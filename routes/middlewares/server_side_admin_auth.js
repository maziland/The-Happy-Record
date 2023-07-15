// Middleware to prevent unauthorized access 
module.exports = (req, res, next) => {
    if (req.session.username === "admin") {
        return next();
    }
    return res.status(401).render("unauthorized.ejs");
};