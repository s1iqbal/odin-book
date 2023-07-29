
import express, { Express, Request, Response } from 'express';
import {
    getAllUsers,
    getUserById,
    registerUser,
    updateUser,
    deleteUser
  } from '../../controllers/UserController';

const router = express.Router();
module.exports = function(app: Express){
/*
GET /users: Get all users (used for the users index page).
GET /users/:userId: Get a user's profile information and posts (used for the user show page).
POST /users: Register a new user.
PUT /users/:userId: Update a user's information.
DELETE /users/:userId: Delete a user.
*/

    app.get('/user/all',  getAllUsers);
    app.post('/user', registerUser);
    //Retrieve a user based on ID
    app.get('/user/:id', getUserById)
    //.put(updateUser)
    //.delete(deleteUser);;

    app.get('/user/comments/', function(req: Request, res: Response) {

    });

    app.get('/user/comments/:id', function(req: Request, res: Response) {

    });


    //other routes..
}