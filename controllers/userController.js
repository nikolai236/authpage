const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserController{
    register = async (req, res) => {
        try {
            const data = req.body;

            //const salt = await bcrypt.genSalt(data.username, data.email);
            data.password = await bcrypt.hash(data.password, 8);
            await User.addUser(data);
            this.auth(data, res);

            res.send({ user: data.username });
        } catch(err) {
            res.status(500).send({ error : err.message });
        }
    }

    login = async (req, res) => {
        try {
            const data = req.body;

            const user = await User
                .getUser({ email: data.email })
                .catch(err => console.log(err));

            console.log('compare: ');
            //console.log(req.body);
            console.log(user);

            const isMatch = await bcrypt.compare(data.password, user.password);
            //console.log(isMatch);

            if(!(user && isMatch)) {
                return res.status(403).send({ error: 'Access denied' });
            }
            this.auth(user, res);

            return res.send({
                user: user.username,
            });

        } catch(err) {
            console.log(err);
            res.status(500).send({ error : err.message });
        }
    }

    logout = async (req, res) => {
        try {
            res.cookie('token', 'logged out', { httpOnly: true });
            res.send('logged out');
        } catch(err) {
            console.log(err);
            res.status(500).send({ error : err.message });
        }
    }

    auth = (data, res) => {
        console.log(data);
        const token = jwt.sign(
            {
                user_email: data.email,
            },
            process.env.JWT,
            {
                expiresIn: '2h',
            }
        );

        res.cookie('token', token, { httpOnly: true });
        return token;
    }

    checkAuth = async (req, res) => {
        if(!req.user_email) return res.send(null);

        const user = await User
            .getUser({ email: req.user_email })
            .catch(err => {
                console.log(err)
                res.send(null);
            });

        console.log(user);
        return res.json(user.username || null);
    }
}

module.exports = new UserController;