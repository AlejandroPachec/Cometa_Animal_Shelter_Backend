const express = require('express');
// const getAllProducts = require('../controllers/products/getAllProducts');
const addPet = require('../controllers/products/addPet');
// const getProduct = require('../controllers/products/getProduct');
const authTeamMember = require('../middlewares/authTeamMember');

const petsRouter = express.Router();

// productsRouter.get('/', getAllPets);
petsRouter.post('/addPet', authTeamMember, addPet);
// productsRouter.get('/:idPet', getPet);

module.exports = petsRouter;
