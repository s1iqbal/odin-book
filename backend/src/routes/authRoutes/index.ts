import express from 'express';
import {
    authFacebook,
    authFacebookCallback,
    loginUser
  } from '../../controllers/UserController';

const router = express.Router();

//auth -> move to routes/authRoutes
router.post('/login', loginUser);
router.get('/facebook', authFacebook);
router.get('/facebook/callback', authFacebookCallback);


export default router;