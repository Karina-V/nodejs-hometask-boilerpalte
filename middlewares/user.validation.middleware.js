const { user } = require('../models/user');
const { UserRepository } = require('../repositories/userRepository');

const isExist = (obj, field) => Boolean(obj[field]);
const hasFieds = (obj, fieldsArr) => fieldsArr.every(f => isExist(obj, f));

const createUserValid = (req, res, next) => {
    // TODO: Implement validatiors for user entity during creation
    const userData = req.body;
    const requiredFields = ['email', 'firstName', 'lastName', 'phoneNumber', 'password'];
    const hasRequiredFields = hasFieds(userData, requiredFields);

    try {
        if (!hasRequiredFields) {
            throw new Error('Not All required fields are set!');
        } else if (userData.password.length < 3) {
            throw new Error('Password should be at least 3 characters length!');
        } else if (!userData.email.includes('gmail')) {
            throw new Error(`Email should be have 'gmail'!`);
        } else if (UserRepository.getOne({ email: userData.email })) {
            throw new Error(`User with email: "${userData.email}" already exist.`);
        } else if (!userData.phoneNumber.startsWith('+380') || !userData.phoneNumber.length == 12) {
            throw new Error(`Phone number should be have '+380' and should be at least 13 characters length`);
        } else if (UserRepository.getOne({ phoneNumber: userData.phoneNumber })) {
            throw new Error(`User with phone number: "${userData.phoneNumber}" already exist.`);
        }
    } catch (error) {
        return res.status(400).json({ error: true, message: error.message });
    }


    next();
}

const userExist = (req, res, next) => {
    console.log(req.params.id);

    try {
        if (!UserRepository.getOne({ id: req.params.id })) {
            throw new Error(`User with id: "${req.params.id}" does not exist.`);
        }
    } catch (error) {
        return res.status(400).json({ error: true, message: error.message });
    }

    next();
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update

    let isError = false;
    const users = userService.getUsers();
    users
        .filter((user) => user.id !== id)
        .map((user) => {
            if (
                email &&
                user.email.toLowerCase() === email.toLowerCase()
            ) {
                res.status(400).send('A user with such an email address already exists! Please, use a different email address!');
                isError = true;
            }
            if (
                phoneNumber &&
                user.phoneNumber.toLowerCase() === phoneNumber.toLowerCase()
            ) {
                res.status(400).send('A user with such a phone number already exists! Please, use a different phone number!');
                isError = true;
            }
        });

    if (isError) {
        return middleware(req, res, next);
    }
    next();

}

exports.userExist = userExist;
exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;