const { user } = require('../models/user');

const isExist = (obj, field) => Boolean(obj[field]);
const hasFieds = (obj, fieldsArr) => fieldsArr.every(f => isExist(obj, f));

const createUserValid = (req, res, next) => {
    // TODO: Implement validatiors for user entity during creation
    const userData = req.body;
    const requiredFields = ['email', 'firstName', 'lastName', 'phoneNumber', 'password'];
    const hasRequiredFields = hasFieds(userData, requiredFields)

    if (!hasRequiredFields) {
        res.status(400).send('Not All required fields are set!');
    }

    if (userData.password.length < 3) {
        res.status(400).send('Password should be at least 3 characters length!');
    }

    if (!userData.email.includes('gmail')) {
        res.status(400).send(`Email should be have 'gmail'!`);
    }
    if (!userData.phoneNumber.startsWith('+380') || !userData.phoneNumber.length == 12) {
        res.status(400).send(`Phone number should be have '+380' and should be at least 13 characters length`);
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

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;