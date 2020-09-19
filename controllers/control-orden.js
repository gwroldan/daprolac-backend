const control = require('./control');
const orden = require('../models/orden');

exports.obtenerOrdenes = async (req, res, next) => {
  control.obtener(req, res, next, orden);
};
exports.crearOrden = async (req, res, next) => {
  control.crear(req, res, next, orden);
};
exports.actualizarOrden = async (req, res, next) => {
  control.actualizar(req, res, next, orden);
};
exports.eliminarOrden = async (req, res, next) => {
  control.eliminar(req, res, next, orden);
};
