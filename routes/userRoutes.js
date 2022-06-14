const { Router } = require('express');
const userService = require('../services/userService');
const { createUserValid, updateUserValid, userExist } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', (req, res, next) => {
    res.data = userService.getUsers();
    next();
},
    responseMiddleware
)

router.get('/:id', (req, res, next) => {
    res.data = userService.getUserById(req.params.id);
    next();
},
    responseMiddleware
);

router.post('/', createUserValid, (req, res, next) => {
    res.data = userService.addUser(req.body);
    next();
},
    responseMiddleware
);

router.put('/:id', updateUserValid, (req, res, next) => {
    res.data = userService.updateUser(req.params.id, req.body);
    next();
},
    responseMiddleware
);

router.delete('/:id', userExist, (req, res, next) => {
    console.log(req.params.id);
    userService.deleteUser(req.params.id);
    res.data = { message: `Successfully deleted user with id ${req.params.id}` };

    next();
},
    responseMiddleware
);    //added


module.exports = router;