const logSchema = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth } = require('../auth-midware/auth');

function reg(req, res) {
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new logSchema({
        username, password: hash
    });

    newUser.save(function (err) {
        if (err) console.log(err);

        res.send("User created sucessfully");
    })
}

async function log(req, res) {
    const { username, password } = req.body;
    const logged = await logSchema.findOne({ username });
    // console.log(logged);
    // const usernameMarch = bcrypt.compareSync(username, logged.username);
    if (logged) {
        const passwordsMarch = await bcrypt.compareSync(password, logged.password);
        if (passwordsMarch) {
            const token = jwt.sign({ username: logged.username }, process.env.jwtKey);
            res.json({
                message: "LOGIN SUCESSFUL",
                logged,
                token
            })
            // console.log(logged);
        } else {
            res.send("Username or password is incorrect");
        }

    } else {
        res.send("Username or password is incorrect");
    }

}

function gen(req, res) {
    res.send("anyone can access this route")
}

function restric(req, res) {
    const { username, password } = req.body;

    res.send(`WELCOME USER ${username}`)
}


module.exports = { reg, log, gen, restric };