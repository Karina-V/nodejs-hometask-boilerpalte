const isEmpty = require('lodash.isempty');
const { user } = require('../models/user');
const userService = require("../services/userService");

const isExist = (obj, field) => Boolean(obj[field]);
const isValidUserProperty = (prop) => user.hasOwnProperty(prop);
const hasFieds = (obj, fieldsArr) => fieldsArr.every(f => isExist(obj, f));
const omittedFields = ['id'];
const requiredFields = Object.keys(user).filter(f => !omittedFields.includes(f));
const hasInValidFields = (userObj) => !Object.keys(userObj).every(f => isValidUserProperty(f));

const isValidEmail = (email) => typeof email === 'string' && email.includes('@gmail');
const isValidPassword = (pass) => typeof pass === 'string' && pass.length >= 3;
const isValidPhone = (phone) => phone.startsWith('+380') && phone.length === 12;

const isUserAlreadyExistWithId = (id) => Boolean(userService.search({ id }));
const isUserAlreadyExistWithEmail = (email) => Boolean(userService.search({ email }));
const isUserAlreadyExistWithPhone = (phoneNumber) => Boolean(userService.search({ phoneNumber }));

const createUserValid = (req, res, next) => {
    const userData = req.body;
    const hasAllRequiredFields = hasFieds(userData, requiredFields);

    try {
        if (isEmpty(userData)) {
            throw new Error(`Payload should not be empty!`);
        } else if (!hasAllRequiredFields) {
            throw new Error(`Not all required fields are set! Required fields are: ${requiredFields.toString()}.`);
        } else if (userData.id) {
            throw new Error(`The 'id' field should not be present!`);
        } else if (hasInValidFields(userData)) {
            throw new Error(`Should not contain other fields!`);
        } else if (!isValidPassword(userData.password)) {
            throw new Error('Password should be at least 3 characters length!');
        } else if (!isValidEmail(userData.email)) {
            throw new Error(`Email should inlude '@gmail'!`);
        } else if (isUserAlreadyExistWithEmail(userData.email)) {
            throw new Error(`User with email: "${userData.email}" already exist!`);
        } else if (!isValidPhone(userData.phoneNumber)) {
            throw new Error(`Phone number should follow format '+380xxxxxxxxx'!`);
        } else if (isUserAlreadyExistWithPhone(userData.phoneNumber)) {
            throw new Error(`User with phone number: "${userData.phoneNumber}" already exist!`);
        }
    } catch (error) {
        return res.status(400).json({ error: true, message: error.message });
    }


    next();
}

const updateUserValid = (req, res, next) => {
    const userData = req.body;

    try {
        if (isEmpty(userData)) {
            throw new Error(`Payload should not be empty!`);
        } else if (hasInValidFields(userData)) {
            throw new Error(`Should not contain other fields!`);
        } else if (userData.id) {
            throw new Error(`The 'id' field should not be present!`);
        } else if (userData.password && !isValidPassword(userData.password)) {
            throw new Error('Password should be at least 3 characters length!');
        } else if (userData.email && !isValidEmail(userData.email)) {
            throw new Error(`Email should inlude '@gmail'!`);
        } else if (userData.phoneNumber && !isValidPhone(userData.phoneNumber)) {
            throw new Error(`Phone number should be have '+380' and should be at least 13 characters length`);
        }
    } catch (error) {
        return res.status(400).json({ error: true, message: error.message });
    }

    next();
}

const getUserValid = (req, res, next) => {
    if (!isUserAlreadyExistWithId(req.params.id)) {
        return res.status(404).json({ error: true, message: `User with id: "${req.params.id}" not found.` });
    }

    next();
}

const deleteUserValid = (req, res, next) => {
    if (!isUserAlreadyExistWithId(req.params.id)) {
        return res.status(404).json({ error: true, message: `User with id: "${req.params.id}" not found.` });
    }

    next();
}

exports.createUserValid = createUserValid;
exports.getUserValid = getUserValid;
exports.updateUserValid = updateUserValid;
exports.deleteUserValid = deleteUserValid;
