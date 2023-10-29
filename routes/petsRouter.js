const express = require('express');
const getAllPets = require('../controllers/pets/getAllPets');
const addPet = require('../controllers/pets/addPet');
// const getProduct = require('../controllers/products/getProduct');
const authTeamMember = require('../middlewares/authTeamMember');

const petsRouter = express.Router();

petsRouter.get('/', getAllPets);
petsRouter.post('/addPet', authTeamMember, addPet);
// productsRouter.get('/:idPet', getPet);

module.exports = petsRouter;
