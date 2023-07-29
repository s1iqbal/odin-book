import { Request, Response } from 'express';
import User, { IUser } from '../../models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//Retrieve all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

//Retrieve a user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ error: 'Invalid user ID' });
            return;
        }
        const user: IUser | null = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

//Register a new User
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, profilePhoto = ''} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({ username, email, password: hashedPassword, profilePhoto, friends: [] });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Update a user's information
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const { username, email, password, profilePhoto } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
    }
    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email, password: hashedPassword, profilePhoto },
            { new: true, omitUndefined: true } // omitUndefined prevents removing values if not included in request
        );
        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
    }
    try {
        const deletedUser = await User.findByIdAndRemove(userId);
        if (!deletedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
