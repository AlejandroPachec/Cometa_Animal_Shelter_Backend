const express = require('express');
const testimoniesRouter = express.Router();
const authTeamMember = require('../middlewares/authTeamMember');

const getTestimonies = require('../controllers/testimonies/getTestimonies');
const getAllTestimonies = require('../controllers/testimonies/getAllTestimonies');
const addTestimony = require('../controllers/testimonies/addTestimony');

testimoniesRouter.get('/', getAllTestimonies);
testimoniesRouter.post('/addTestimony', authTeamMember, addTestimony);
testimoniesRouter.get('/:idTestimony', getTestimonies);

module.exports = testimoniesRouter;
