const express = require('express');
const router = express.Router();

// importo los schemas
const { crearUsuarioSchema, actualizarUsuarioSchema } = require('../utils/schemas/usuario');
const { crearProcesoSchema, actualizarProcesoSchema } = require('../utils/schemas/proceso');
const { crearTareaSchema, actualizarTareaSchema } = require('../utils/schemas/tarea');
const { crearDatoSchema, actualizarDatoSchema } = require('../utils/schemas/dato');
const validationHandler = require('../utils/middlewares/validation-handler');

// importo los controlares
const usuariosController = require('../controllers/control-usuario');
const procesosController = require('../controllers/control-proceso');
const tareasController = require('../controllers/control-tarea');
const datosController = require('../controllers/control-dato');

module.exports = () => {
    router.get('/usuarios', usuariosController.obtenerUsuarios);
    router.get('/usuarios/:id', usuariosController.obtenerUsuarios);
    router.post('/usuarios', validationHandler(crearUsuarioSchema), usuariosController.crearUsuario);
    router.put('/usuarios/:id', validationHandler(actualizarUsuarioSchema), usuariosController.actualizarUsuario);
    router.delete('/usuarios/:id', usuariosController.eliminarUsuario);

    router.get('/procesos', procesosController.obtenerProcesos);
    router.get('/procesos/:id', procesosController.obtenerProcesos);
    router.post('/procesos', validationHandler(crearProcesoSchema), procesosController.crearProceso);
    router.put('/procesos/:id', validationHandler(actualizarProcesoSchema), procesosController.actualizarProceso);
    router.delete('/procesos/:id', procesosController.eliminarProceso);

    router.get('/tareas', tareasController.obtenerTareas);
    router.get('/tareas/:id', tareasController.obtenerTareas);
    router.post('/tareas', validationHandler(crearTareaSchema), tareasController.crearTarea);
    router.put('/tareas/:id', validationHandler(actualizarTareaSchema), tareasController.actualizarTarea);
    router.delete('/tareas/:id', tareasController.eliminarTarea);

    router.get('/datos', datosController.obtenerDatos);
    router.get('/datos/:id', datosController.obtenerDatos);
    router.post('/datos', validationHandler(crearDatoSchema), datosController.crearDato);
    router.put('/datos/:id', validationHandler(actualizarDatoSchema), datosController.actualizarDato);
    router.delete('/datos/:id', datosController.eliminarDato);

    return router;
}


