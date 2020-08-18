const Sequilize = require('sequelize');
const db = require('../config/mysql');

const proceso = require('../models/proceso');

const orden = db.define('orden', {
    id: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    },
    idProceso: {
        type: Sequilize.INTEGER,
        allowNull: false,
        references: {
            model: proceso,
            key: 'id'
        },
    },
    numero: {
        type: Sequilize.INTEGER,
        allowNull: false
    },
    finalizada: {
        type: Sequilize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

orden.belongsTo(proceso, { as: 'proceso', foreignKey: 'idProceso' });

module.exports = orden;
