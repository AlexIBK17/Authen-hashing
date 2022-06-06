const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const logSchema = require('../model/user');

function auth(req, res, next) {
    const tokenauthheader = req.headers.authorization;
    if (tokenauthheader) {
        if (tokenauthheader.split(" ")[0] == "Bearer") {
            const token = tokenauthheader.split(" ")[1];
            jwt.verify(token, process.env.jwtKey, function (err, payload) {
                if (err) {
                    console.log(err);
                    res.send("You are not allowed access to this route")
                }
                const { username, password } = req.body;
                logSchema.findOne({ username }, 'username password', function (err, check) {
                    if (err) {
                        console.log(err);

                    } if (check) {
                        console.log(payload);
                        next();

                    }
                    else {
                        res.send("User does not exist")
                    }
                });



            });

        }
    }
}

module.exports = { auth };