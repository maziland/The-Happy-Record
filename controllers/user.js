const usersService = require("../services/user")

async function renderAccountPage(req, res) {
    try {
        if (req.session.username) {
            // User is authenticated, show user profile
            account = await usersService.getUserByUsername(req.session.username);
            return res.render('myaccount.ejs', { account: { username: account.username, email: account.email } });
        } else {
            return res.redirect(`/login?message=${encodeURIComponent(`Please login first!`)}`);
        }
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function updateAccount(req, res) {
    try {
        if (req.get('Content-Type') === 'application/x-www-form-urlencoded') {
            logger.info(`Got update request for user: ${req.session.username}`);
            const { username, email, password, confirmPassword } = req.body;

            // In case form username is different from session
            if (req.session.username != username) {
                logger.error("Got update request with different a username");
                return res.status(400).send('Wrong username');
            }

            // Update user 
            user = await usersService.getUserByUsername(username);
            // Update email if we got a new one
            if (user.email != email) {
                logger.info(`Updating email for user: ${username}`);
                user.updateEmail(email);
            }
            // Update password
            if ((password != '') && (confirmPassword === password)) {
                logger.info(`Updating password for user: ${username}`);
                user.updatePassword(password);
            }
            return res.redirect('/myaccount');
        }
        res.status(400).send('Wrong Content-Type');
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { renderAccountPage, updateAccount };