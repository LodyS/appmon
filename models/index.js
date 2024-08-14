const configDB = require("../config/db.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    configDB.DB,
    configDB.USER,
    configDB.PASSWORD,
    {
        host:configDB.HOST,
        dialect:configDB.dialect,
        pool : {
            max : configDB.pool.max,
            min : configDB.pool.min,
            idle : configDB.pool.idle,
            acquire : configDB.pool.acquire
        }
    }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("../models/users.js")(sequelize, Sequelize);
db.requestUser = require("../models/requestUser.js")(sequelize, Sequelize);
db.tokenBlacklist = require("../models/tokenBlacklist.js")(sequelize, Sequelize);

module.exports = db;