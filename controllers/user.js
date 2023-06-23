const usersService = require("../services/user")

async function renderAccountPage(req, res) {
    try {
        if (req.session.username) {
            // User is authenticated, show user profile
            account = await usersService.getUser(req.session.username);
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
            const { username, password } = req.body;
            // Validate login
            user = await usersService.getUser(username);
            if (user) {
                // User exists
                if (user.validPassword(password)) {
                    // Login is successful
                    req.session.username = username;
                    console.log(`${username} signed in!`);
                    return res.redirect('/');
                } else {
                    // Wrong password
                    return res.render("login.ejs", { errorMessage: "Wrong password!" });
                }
            } else {
                // User doe's not exist
                return res.render("login.ejs", { errorMessage: "User doe's not exist!" });
            }

            return res.redirect('/');
        }
        res.status(400).send('Wrong Content-Type');
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { renderAccountPage, updateAccount };