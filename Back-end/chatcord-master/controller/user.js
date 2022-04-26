const bcrypt = require('bcrypt');
const { success, error } = require('../utils/restResponse');
const constants = require('../config/constants');
const env = require('../config/env');

exports.signUp = (req, res) => {
    try {
        const {
            name,
            email,
            mobile_no,
            password
        } = req.body


        const salt = bcrypt.genSaltSync(10);
        const hashedPwd = bcrypt.hashSync(password, salt);

        const item = [name, email, mobile_no, hashedPwd];

        DB.query(`SELECT * FROM user WHERE mobile_no = ? `, mobile_no, function (err, result1) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            } else if (result1.length > 0) {
                return res.send(error("Mobile Number already exist!!"));
            }

            DB.query(`SELECT * FROM user WHERE email = ? `, email, function (err, result1) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                } else if (result1.length > 0) {
                    return res.send(error("Email already exist!!"));
                }

                let sql = `INSERT INTO user (name, email,mobile_no, password) VALUES (?,?,?,?)`
                DB.query(sql, item, function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    return res.send(success(result, "Registration Complete "));
                });
            });
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.login = (req, res) => {
    try {
        let param = req.body;
        DB.query('select * from user where email = ?', [param.email], async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            else if (result.length <= 0) {
                return res.send(error('Invalid email id!'));
            }
            let u = result[0];
            let validUser = bcrypt.compareSync(req.body.password, u.password);

            if (!validUser) {
                return res.send(error('Invalid Password!'));
            }

            if (u.is_active != 1) {
                return res.send(error('Inactive user!'));
            }
            // var token = jwt.sign({ user_id: u.id, user: u }, env.jwtsecret, {
            //     expiresIn: 86400 // expires in 24 hours
            // });

            // u.token = token;
            // delete u.password;

            return res.send(success(u, "Logged in successfully!"));

        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}