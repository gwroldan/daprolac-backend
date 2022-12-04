const Sequilize = require('sequelize');
const db = require('../config/mysql');

const orden = require('../models/orden');
const tarea = require('../models/tarea');
const usuario = require('../models/usuario');
const ordenDato = require('../models/orden-dato');

const ordenTarea = db.define('orden_tarea', {
    id: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    },
    idOrden: {
        type: Sequilize.INTEGER,
        allowNull: false,
        references: {
            model: orden,
            key: 'id'
        }
    },
    idTarea: {
        type: Sequilize.INTEGER,
        allowNull: false,
        references: {
            model: tarea,
            key: 'id'
        }
    },
    idUsuario: {
        type: Sequilize.INTEGER,
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
        type: Sequilize.DATE
    },
    fechaFin: {
        type: Sequilize.DATE,
    },
});

ordenTarea.belongsTo(usuario, { as: 'usuario', foreignKey: 'idUsuario' });
ordenTarea.hasMany(ordenDato, { as: 'datos' , foreignKey: 'idOrdenTarea', sourceKey: 'id'});

ordenDato.belongsTo(ordenTarea, { as: 'tarea', foreignKey: 'idOrdenTarea' });

module.exports = ordenTarea;
