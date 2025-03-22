const sequelize = require('./db')
const {DataTypes} = require('sequelize')

const Tovar = sequelize.define('tovar', {
    id_tovar: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tovar: {type: DataTypes.INTEGER},
    tovar123: {type: DataTypes.INTEGER},
})
const User = sequelize.define('user ', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

module.exports = {
    Tovar,
    User
}