const express = require('express');
const teamRouter = express.Router();
// const authUser = require('../middlewares/authUser');

const createTeamMember = require('../controllers/team/createTeamMember');
const activateTeamMember = require('../controllers/team/activateTeamMember');
// const loginUser = require('../controllers/team/loginTeamMember');
const getTeamMember = require('../controllers/team/getTeamMember');
// const editUser = require('../controllers/team/editTeamMember');

teamRouter.post('/create', createTeamMember);
teamRouter.get('/activate/:registrationCode', activateTeamMember);
// userRouter.post('/login', loginUser);
teamRouter.get('/profile/:teamId', getTeamMember);
// userRouter.put('/edit', authUser, editUser);

module.exports = teamRouter;
