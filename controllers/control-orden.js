const { DateTime } = require('luxon');
const control = require('./control');

const orden = require('../models/orden');
const proceso = require('../models/proceso');
const ordenTarea = require('../models/orden-tarea');
const ordenDato = require('../models/orden-dato');

const utils = require('../utils/utils');
const response = require('../utils/response');

function getProcesoAsoc(req) {
  let fechaInicia = Date.now();
  if (req.body.fechaInicia) {
    const fecha = new Date(req.body.fechaInicia);
    fechaInicia = fecha.getTime();
  }

  return {
    idProceso: req.body.idProceso,
    fechaInicia: fechaInicia,
    numero: req.body.numero ? req.body.numero : 0
  };
}

async function setTareasOrden(objAsoc, idOrden, trans) {
  // Obtengo el proceso que me llego en la consulta
  const objProceso = await proceso
      .findOne({
        where: objAsoc.idProceso,
        include: [{ all: true, nested: true }],
        transaction: trans
      });

  // El proceso debe tener tareas asociadas
  if (!objProceso.tareas.length) {
    throw response.customError('El proceso seleccionado no cuenta con tareas asociadas.', 409);
  }

  let fechaInicia = DateTime.fromMillis(objAsoc.fechaInicia);
  const tareasSort = utils.sortTareas(objProceso.tareas);

  const tareasOrden = [];
  const datosOrden = [];
  tareasSort.forEach( tarea => {
    if (tarea.proceso_tarea.idTareaAntecesora) {
      fechaInicia = fechaInicia
          .plus({
            days: tarea.proceso_tarea.diasAntecesora,
            hours: tarea.proceso_tarea.horasAntecesora,
            minutes: tarea.proceso_tarea.minutosAntecesora
          });
    }

    tareasOrden.push({
      idOrden: idOrden,
      idTarea: tarea.id,
      fechaIniciaProp: fechaInicia.toJSDate()
    });

    tarea.datos.forEach( dato => {
      datosOrden.push({
        idOrden: idOrden,
        idTarea: tarea.id,
        idDato: dato.id
      });
    });
  });

  await ordenTarea.bulkCreate(tareasOrden, { transaction: trans, validate: true });
  await ordenDato.bulkCreate(datosOrden, { transaction: trans, validate: true });
}

exports.setOrdenNumero = async (req, res, next) => {
  if (!req.body.numero || (req.body.numero && req.body.numero === 0)) {
    const resultado = await orden.max('numero');
    let numero = resultado ? resultado : 0;
    req.body.numero = ++numero;
  }
  next();
}

exports.obtenerOrdenes = async (req, res, next) => { control.obtener(req, res, next, orden); }

exports.crearOrden = async (req, res, next) => {
  const procesoAsoc = getProcesoAsoc(req);
  control.crear(req, res, next, orden, procesoAsoc, setTareasOrden);
}
exports.actualizarOrden = async (req, res, next) => { control.actualizar(req, res, next, orden); }
exports.eliminarOrden = async (req, res, next) => { control.eliminar(req, res, next, orden); }
