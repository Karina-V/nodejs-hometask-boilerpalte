const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user
router.post('/', createUserValid, (req, res, next) => {
    const newUser = UserService.create(req.body);

    res.json(newUser);
});

router.put('/:id', updateUserValid, (req, res, next) => {
    const updatedUser = UserService.update(req.body);

    res.json(updatedUser);
});


module.exports = router;