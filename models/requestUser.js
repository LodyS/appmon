const { DataTypes } = require("sequelize")

module.exports = (sequelize, Sequelize)=> {
    const requestUser = sequelize.define("request_user", {
        date : {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW,
        },
        media : {
            type : DataTypes.STRING
        },
        unit : {
            type : DataTypes.STRING
        },
        application : {
            type : DataTypes.STRING
        },
        type : {
            type : DataTypes.STRING
        }, 
        detail : {
            type : DataTypes.STRING
        }, 
        pic : {
            type : DataTypes.STRING
        },
        status : {
            type : DataTypes.STRING
        },
        start : {
            type : DataTypes.DATE,
        }, 
        end : {
            type : DataTypes.DATE 
        },
        notes : {
            type : DataTypes.STRING
        }
    });

    return requestUser;
}