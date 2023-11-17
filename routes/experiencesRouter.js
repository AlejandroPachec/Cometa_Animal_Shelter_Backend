const express = require('express');
const experiencesRouter = express.Router();
const authTeamMember = require('../middlewares/authTeamMember');

const getAllExperiences = require('../controllers/experiences/getAllExperiences');
const addExperience = require('../controllers/experiences/addExperience');

experiencesRouter.get('/', getAllExperiences);
experiencesRouter.post('/addExperience', authTeamMember, addExperience);

module.exports = experiencesRouter;
