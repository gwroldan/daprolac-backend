const joiBase = require('@hapi/joi');
const joiDate = require('@hapi/joi-date');

const joi = joiBase.extend(joiDate);

const numeroOrdenSchema = joi.number().min(0);
const finalizadaOrdenSchema = joi.boolean();
const idProcesoOrdenSchema = joi.number();
const fechaIniciaOrdenSchema = joi.date();

const tareaDatoSchema = {
  idDato: joi.number().required(),
  valor: joi.string(),
};
const tareaDatosSchema = joi.array().items(tareaDatoSchema);

const ordenTareaSchema = {
  idUsuario: joi.number(),
  fechaIniciaProp: joi.date(),
  fechaInicia: joi.date(),
  fechaFin: joi.date(),
  tareaDatos: tareaDatosSchema
};
const ordenTareasSchema = joi.array().items(ordenTareaSchema);

const crearOrdenSchema = {
  idProceso: idProcesoOrdenSchema.required(),
  numero: numeroOrdenSchema,
  finalizada: finalizadaOrdenSchema,
  fechaInicia: fechaIniciaOrdenSchema
};

const actualizarOrdenSchema = {
  numero: numeroOrdenSchema,
  finalizada: finalizadaOrdenSchema,
};

module.exports = {
  crearOrdenSchema,
  actualizarOrdenSchema,
};
