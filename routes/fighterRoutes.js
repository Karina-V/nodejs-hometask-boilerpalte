const { Router } = require('express');
const fighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { getFighterValid, createFighterValid, updateFighterValid, deleteFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get('/', (req, res, next) => {
    res.data = fighterService.getFighters();
    next();
}, responseMiddleware);

router.get('/:id', getFighterValid, (req, res, next) => {
    res.data = fighterService.getFighterById(req.params.id);
    next();
}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {
    res.data = fighterService.addFighter(req.body);
    next();
}, responseMiddleware);

router.put('/:id', updateFighterValid, (req, res, next) => {
    res.data = fighterService.updateFighter(req.params.id, req.body);
    next();
}, responseMiddleware);

router.delete('/:id', deleteFighterValid, (req, res, next) => {
    fighterService.deleteFighter(req.params.id);
    res.data = { message: `Successfully deleted fighter with id: '${req.params.id}'` };
    next();
}, responseMiddleware);

module.exports = router;