const { Router } = require('express');
const fighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid, fighterExist } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter


router.get('/', (req, res, next) => {
    res.data = fighterService.getFighters();
    next();
},
    responseMiddleware
)

router.get('/:id', (req, res, next) => {
    res.data = fighterService.getFightersById(req.params.id);
    next();
},
    responseMiddleware
);

router.post('/', createFighterValid, (req, res, next) => {
    res.data = fighterService.addFighter(req.body);
    next();
},
    responseMiddleware
);

router.put('/:id', updateFighterValid, (req, res, next) => {
    res.data = fighterService.updateFighter(req.params.id, req.body);
    next();
},
    responseMiddleware
);

router.delete('/:id', fighterExist, (req, res, next) => {
    console.log(req.params.id);
    fighterService.deleteFighter(req.params.id);
    res.data = { message: `Successfully fighter user with id ${req.params.id}` };

    next();
},
    responseMiddleware
);

module.exports = router;