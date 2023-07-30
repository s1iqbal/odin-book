import express from 'express';
import {
    loginUser,
    logoutUser
  } from '../../controllers/UserController';

const router = express.Router();

//auth -> move to routes/authRoutes
router.post('/login', loginUser);

router.post('/logout', logoutUser);


export default router;