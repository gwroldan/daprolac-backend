const joi = require('@hapi/joi');

const numeroOrdenSchema = joi.number().min(0);
const finalizadaOrdenSchema = joi.boolean();

const ordenTareaSchema = {
  idUsuario: joi.number().required(),
  fechaIniciaProp: joi.date(),
  fechaInicia: joi.date(),
  fechaFin: joi.date(),
};

const ordenDatoSchema = {
  idOrden: joi.number(),
  idTarea: joi.number(),
  idDato: joi.number(),
  valor: joi.string(),
};

const crearOrdenSchema = {
  numero: numeroOrdenSchema.required(),
  finalizada: finalizadaOrdenSchema.required(),
  idProceso: joi.number().required(),
  tarea: ordenTareaSchema,
  dato: ordenDatoSchema,
};

const actualizarOrdenSchema = {
  numero: numeroOrdenSchema.required(),
  finalizada: finalizadaOrdenSchema.required(),
  idProceso: joi.number().required(),
  tarea: ordenTareaSchema,
  dato: ordenDatoSchema,
};

module.exports = {
  crearOrdenSchema,
  actualizarOrdenSchema,
};
