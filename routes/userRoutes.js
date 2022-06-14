const { Router } = require('express');
const userService = require('../services/userService');
const { getUserValid, createUserValid, updateUserValid, deleteUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.get('/', (req, res, next) => {
    res.data = userService.getUsers();
    next();
}, responseMiddleware);

router.get('/:id', getUserValid, (req, res, next) => {
    res.data = userService.getUserById(req.params.id);
    next();
}, responseMiddleware);

router.post('/', createUserValid, (req, res, next) => {
    res.data = userService.addUser(req.body);
    next();
}, responseMiddleware);

router.put('/:id', updateUserValid, (req, res, next) => {
    res.data = userService.updateUser(req.params.id, req.body);
    next();
}, responseMiddleware);

router.delete('/:id', deleteUserValid, (req, res, next) => {
    userService.deleteUser(req.params.id);
    res.data = { message: `Successfully deleted user with id '${req.params.id}'` };
    next();
}, responseMiddleware);


module.exports = router;