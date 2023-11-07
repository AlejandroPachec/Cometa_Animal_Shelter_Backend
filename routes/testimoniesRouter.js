const express = require('express');
const testimoniesRouter = express.Router();
const authTeamMember = require('../middlewares/authTeamMember');

const getAllTestimonies = require('../controllers/testimonies/getAllTestimonies');
const addTestimony = require('../controllers/testimonies/addTestimony');

testimoniesRouter.get('/', getAllTestimonies);
testimoniesRouter.post('/addTestimony', authTeamMember, addTestimony);

module.exports = testimoniesRouter;
