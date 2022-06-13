const { Router } = require('express');
const userService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware: middleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user
const getUserData = (data, res, next) => {
    try {
        res.data = data;
    } catch (error) {
        res.err = error;
    } finally {
        next();
    }
};

router.get('/', (req, res, next) =>
    getUserData(userService.getUsers(), res, next),
    middleware
);

router.get('/:id', (req, res, next) =>
    getUserData(userService.getUserById(req.params.id), res, next),
    middleware
);

router.post('/', createUserValid, (req, res, next) =>
    getUserData(userService.addUser(req.body), res, next),
    middleware
);

router.put('/:id', updateUserValid, (req, res, next) =>
    getUserData(userService.updateUser(req.params.id, req.body), res, next),
    middleware
);

router.put('/:id', (req, res, next) => getUserData(userService.deleteUser(req.params.id), res, next),
    (req, res, next) => {
        if (res.data.length) {
            res.data = { message: `User with id: ${id} deleted` };
            res.statusCode = 200;
        } else {
            res.statusCode = 404;
        }
        next();
    },
    middleware);




// router.post('/', createUserValid, (req, res, next) => {
//     const newUser = UserService.create(req.body);

//     res.json(newUser);
// });

// router.put('/:id', updateUserValid, (req, res, next) => {
//     const updatedUser = UserService.update(req.body);

//     res.json(updatedUser);
// });


module.exports = router;