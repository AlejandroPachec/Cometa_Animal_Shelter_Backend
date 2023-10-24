const express = require('express');
const teamRouter = express.Router();
const createTeamMember = require('../controllers/team/createTeamMember');
const activateTeamMember = require('../controllers/team/activateTeamMember');
const loginTeamMember = require('../controllers/team/loginTeamMember');
const getTeamMember = require('../controllers/team/getTeamMember');
const authTeamMember = require('../middlewares/authTeamMember');


teamRouter.post('/create', authTeamMember, createTeamMember);
teamRouter.get('/activate/:registrationCode', activateTeamMember);
teamRouter.post('/login', loginTeamMember);
teamRouter.get('/profile/:teamId', authTeamMember, getTeamMember);


module.exports = teamRouter;
