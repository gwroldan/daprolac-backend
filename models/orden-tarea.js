const Sequilize = require('sequelize');
const db = require('../config/mysql');

const orden = require('../models/orden');
const tarea = require('../models/tarea');
const usuario = require('../models/usuario');

const ordenTarea = db.define('orden_tarea', {
    idOrden: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: orden,
            key: 'id'
        }
    },
    idTarea: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: tarea,
            key: 'id'
        }
    },
    idUsuario: {
        type: Sequilize.INTEGER,
        allowNull: false,
        references: {
            model: usuario,
            key: 'id'
        }
    },
    fechaIniciaProp: {
        type: Sequilize.DATE,
        allowNull: false
    },
    fechaInicia: {
        type: Sequilize.DATE,
        allowNull: false
    },
    fechaFin: {
        type: Sequilize.DATE,
        allowNull: false
    },
});

ordenTarea.belongsTo(orden, { as: 'orden', foreignKey: 'idOrden' });
ordenTarea.belongsTo(tarea, { as: 'tarea', foreignKey: 'idTarea' });
ordenTarea.belongsTo(usuario, { as: 'usuario', foreignKey: 'idUsuario' });

module.exports = ordenTarea;
