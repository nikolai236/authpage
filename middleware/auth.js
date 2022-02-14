const jwt = require('jsonwebtoken');
//const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        //console.log(token);

        req.user_email = jwt.verify(
            token,
            process.env.JWT
        ).user_email;

        //console.log(req.user_email);
        // if((req.body.email !== req.user_email) && req.body.email ) {
        //     throw new Error('Permission denied');
        // }
        next();

    } catch(err) {
        console.log(err);
        return next();
    }
}

module.exports = auth;