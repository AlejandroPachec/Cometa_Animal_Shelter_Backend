const express = require('express');
const getAllPets = require('../controllers/pets/getAllPets');
const addPet = require('../controllers/pets/addPet');
const getPet = require('../controllers/pets/getPet');
const authTeamMember = require('../middlewares/authTeamMember');

const petsRouter = express.Router();

petsRouter.get('/', getAllPets);
petsRouter.post('/addPet', authTeamMember, addPet);
petsRouter.get('/:idPet', getPet);

module.exports = petsRouter;
