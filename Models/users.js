const { Model, DataTypes} = require('sequelize')
const sequelize = require('../db.config')
class User extends Model { }

User.init({
    nama:{
        type: DataTypes.STRING,
        unique:true
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    alamat:{
        type: DataTypes.STRING
    },
    no_hp:{
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName:'Users'
})

module.exports = User