module.exports = app => {
    var router = require("express").Router();
    const user = require('../controller/user');

    router.post('/register', user.signUp)
    router.post('/login', user.login);

    app.use('/user', router);
}