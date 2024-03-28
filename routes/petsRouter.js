const express = require('express');

const getAllPets = require('../controllers/pets/getAllPets');
const addPet = require('../controllers/pets/addPet');
const getPet = require('../controllers/pets/getPet');
const deletePet = require('../controllers/pets/deletePet');
const updatePetStatus = require('../controllers/pets/updatePetStatus');
const authTeamMember = require('../middlewares/authTeamMember');
const petExists = require('../middlewares/petExists');

const petsRouter = express.Router();

petsRouter.get('/', getAllPets);
petsRouter.post('/add', authTeamMember, addPet);
petsRouter.get('/:idPet', getPet);
petsRouter.put('/updatePetStatus/:idPet', authTeamMember, updatePetStatus);
petsRouter.delete('/delete/:idPet', authTeamMember, petExists, deletePet);

module.exports = petsRouter;
