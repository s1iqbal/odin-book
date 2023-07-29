import express, { Express, Request, Response } from 'express';
import {
    getAllUsers,
    getUserById,
    registerUser,
    updateUser,
    deleteUser,
    authFacebook,
    authFacebookCallback,
    loginUser
  } from '../../controllers/UserController';

const router = express.Router();

router.get('/', getAllUsers);

router.get('/user/:id', getUserById)
   
router.post('/register', registerUser);
    
router.put('/user/:id', updateUser)
    
router.delete('/:id', deleteUser);;



export default router;