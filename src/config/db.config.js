module.exports = {
    HOST: "127.0.0.1",
    USER: process.env.VUE_APP_MYSQL_USERNAME,
    PASSWORD: process.env.VUE_APP_MYSQL_PASSWORD,
    DB: "test",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};