const { Model, DataTypes} = require('sequelize')
const sequelize = require('../db.config')
class Presence extends Model { }

Presence.init({
    user_id:{
        type: DataTypes.INTEGER
    },
    status:{
        type: DataTypes.ENUM('in','out')
    },
},{
    sequelize,
    modelName:'Presences'
})

module.exports = Presence