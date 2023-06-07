module.exports = function handle_404(req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.type('txt').send('Not found');
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
    next()
}