const ejs = require('ejs');
const usersService = require("../services/user")

async function renderLoginPage(req, res) {
    try {
        if (req.session.username) {
            const errorMessage = `You are already logged in as '${req.session.username}'`;
            res.render('login.ejs', { errorMessage });
        } else {
            res.render('login.ejs', { errorMessage: null });
        }
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function login(req, res) {
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

async function register(req, res) {
    try {
        if (req.get('Content-Type') === 'application/x-www-form-urlencoded') {
            // Getting input from form
            const { username, email, password } = req.body;

            // Register the user
            await usersService.addUser(username, password, email);
            // return res.render("login.ejs", { errorMessage: `Welcome ${username}!\nPlease login :)` });
            return res.redirect(`/login?message=${encodeURIComponent(`Welcome ${username}!\nPlease login :)`)}`);

        }
        res.status(400).send('Wrong Content-Type');
    } catch (error) {
        // Handle error - user already exists
        res.render("register.ejs", { errorMessage: "User already exists" });
    }
};

async function renderRegisterPage(req, res) {
    try {
        res.render('register.ejs', { errorMessage: null });
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function logout(req, res) {
    try {
        if (req.session) {
            // Retrieve any flash messages before destroying the session
            req.session.destroy(err => {
                if (err) {
                    // If there was an error
                    res.status(400).send("There was an error in logging you out")
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.end();
        }
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { login, renderLoginPage, register, renderRegisterPage, logout };