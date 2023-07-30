import express, { Express, Request, Response } from 'express';
import {
    getAllUsers,
    getUserById,
    registerUser,
    updateUser,
    deleteUser,
  } from '../../controllers/UserController';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/me', (req,res) => {
  res.status(201).json(req.user);
});

router.get('/user/:id', getUserById)
   
router.post('/register', registerUser);
    
router.put('/user/:id', updateUser)
    
router.delete('/:id', deleteUser);;



export default router;