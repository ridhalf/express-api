const {Sequelize} = require('sequelize')
const sequelize = new Sequelize('belajar_express','ridhal','12345',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize

