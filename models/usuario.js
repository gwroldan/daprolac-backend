const Sequilize = require('sequelize');
const db = require('../config/mysql');

const usuario = db.define('usuario', {
    id: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    },
    nombre: {
        type: Sequilize.STRING(45),
        allowNull: false
    },
    apellido: {
        type: Sequilize.STRING(45),
        allowNull: false
    },
    email: {
        type: Sequilize.STRING(100),
        allowNull: false,
        unique: true
    },
    clave: {
        type: Sequilize.STRING(100),
        allowNull: false
    },
    tipo: {
        type: Sequilize.INTEGER,
        defaultValue: 0
    }
})

module.exports = usuario;
