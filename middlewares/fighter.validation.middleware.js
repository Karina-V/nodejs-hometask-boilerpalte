const isEmpty = require('lodash.isempty');
const { fighter } = require('../models/fighter');
const fighterService = require("../services/fighterService");

const isExist = (obj, field) => Boolean(obj[field]);
const isValidFighterProperty = (prop) => fighter.hasOwnProperty(prop);
const hasFieds = (obj, fieldsArr) => fieldsArr.every(f => isExist(obj, f));
const omittedFields = ['id', 'health'];
const requiredFields = Object.keys(fighter).filter(f => !omittedFields.includes(f));
const hasInValidFields = (fighterObj) => !Object.keys(fighterObj).every(f => isValidFighterProperty(f));

const isNumberBetween = (num, start, end) => !isNaN(num) && typeof num === 'number' && (num >= start) && (num <= end);
const isFighterAlreadyExistWithName = (name) => Boolean(fighterService.search({ name }));
const isFighterAlreadyExistWithId = (id) => Boolean(fighterService.search({ id }));

const createFighterValid = (req, res, next) => {
    const fighterData = req.body;
    const hasAllRequiredFields = hasFieds(fighterData, requiredFields);

    try {
        if (isEmpty(fighterData)) {
            throw new Error(`Payload should not be empty!`);
        } else if (!hasAllRequiredFields) {
            throw new Error(`Not all required fields are set! Required fields are: ${requiredFields.toString()}`);
        } else if (fighterData.id) {
            throw new Error(`The 'id' field should not be present!`);
        } else if (hasInValidFields(fighterData)) {
            throw new Error(`Should not contain other fields!`);
        } else if (fighterData.health && !isNumberBetween(fighterData.health, 80, 120)) {
            throw new Error(`The 'health' value from 80 to 120!`);
        } else if (!isNumberBetween(fighterData.power, 1, 100)) {
            throw new Error(`The 'power' value from 1 to 100!`);
        } else if (!isNumberBetween(fighterData.defense, 1, 10)) {
            throw new Error(`The 'defense' value from 1 to 10!`);
        } else if (isFighterAlreadyExistWithName(fighterData.name)) {
            throw new Error(`The fighter with name: '${fighterData.name}' already exist!`);
        }

        fighterData.health = fighterData.health || 100;
    } catch (error) {
        return res.status(400).json({ error: true, message: error.message });
    }

    next();
}

const updateFighterValid = (req, res, next) => {
    const fighterData = req.body;

    try {
        if (isEmpty(fighterData)) {
            throw new Error(`Payload should not be empty!`);
        } else if (hasInValidFields(fighterData)) {
            throw new Error(`Should not contain other fields!`);
        } else if (fighterData.id) {
            throw new Error(`The 'id' field should not be present!`);
        } else if (fighterData.health && !isNumberBetween(fighterData.health, 80, 120)) {
            throw new Error(`Enter the health value from 80 to 120!`);
        } else if (fighterData.power && !isNumberBetween(fighterData.power, 1, 100)) {
            throw new Error(`Enter the power value from 1 to 100!`);
        } else if (fighterData.defense && !isNumberBetween(fighterData.defense, 1, 10)) {
            throw new Error(`Enter the defense value from 1 to 10!`);
        }
    } catch (error) {
        return res.status(400).json({ error: true, message: error.message });
    }

    next();
}

const getFighterValid = (req, res, next) => {
    if (!isFighterAlreadyExistWithId(req.params.id)) {
        return res.status(404).json({ error: true, message: `Fighter with id: "${req.params.id}" not found.` });
    }

    next();
}

const deleteFighterValid = (req, res, next) => {
    if (!isFighterAlreadyExistWithId(req.params.id)) {
        return res.status(404).json({ error: true, message: `Fighter with id: "${req.params.id}" not found.` });
    }

    next();
}

exports.getFighterValid = getFighterValid;
exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
exports.deleteFighterValid = deleteFighterValid;