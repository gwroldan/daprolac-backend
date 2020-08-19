const db = require('../config/mysql');

const response = require('../utils/response');
const utils = require('../utils/utils');

exports.obtener = async (req, res, next, model) => {
    const { eager } = req.query;

    let options = {};
    if (eager && eager == true && (!utils.isEmpty(model.associations))) {
        options.include = [{ all: true, nested: true }];
    }
    if (req.params && req.params.id) {
        options.where = { id: req.params.id }
    }

    try {
        const resultado = await model.findAll(options);
        response.success(req, res, 200, resultado);
    } catch (err) {
        next(err);
    }
}

exports.crear = async (req, res, next, model, objAsoc = {}, cbkAsoc = undefined) => {
    const trans = await db.transaction();

    try {
        const resultado = await model.create(req.body,  { transaction: trans});
        if (!utils.isEmpty(objAsoc)) { await cbkAsoc(objAsoc, resultado.id, trans) }

        await trans.commit();
        response.success(req, res,201, {id: resultado.id});
    } catch (err) {
        await trans.rollback();
        next(err);
    }
}

exports.actualizar = async (req, res, next, model, objAsoc = {}, cbkAsoc = undefined) => {
    const trans = await db.transaction();

    try {
        const resultado = await model.findOne({ where: {id: req.params.id}, transaction: trans });

        if (resultado) {
            await resultado.update(req.body, { transaction: trans });
            if (!utils.isEmpty(objAsoc)) { await cbkAsoc(objAsoc, req.params.id, trans) }
        }

        await trans.commit();
        response.success(req, res,200, {id: req.params.id});
    } catch (err) {
        await trans.rollback();
        next(err);
    }
}

exports.eliminar = async (req, res, next, model) => {
    try {
        await model.destroy({ where: {id: req.params.id }});
        response.success(req, res,200, {id: req.params.id});
    } catch (err) {
        next(err);
    }
}
