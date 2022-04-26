const env = {
    database: 'chat',
    username: 'root',
    password: 'root',
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    jwtsecret: 'IamOrdin4ryKnowSecret',
    saltRounds: 10,
    myPlaintextPassword: 'hello',
    someOtherPlaintextPassword: 'not_bacon',
};

module.exports = env;