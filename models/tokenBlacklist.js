const { DataTypes, default: sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize)=>{
    const tokenBlacklist = sequelize.define('token_blacklists', {
        token : {
            type : DataTypes.STRING
        },
    })
    
    return tokenBlacklist;
}