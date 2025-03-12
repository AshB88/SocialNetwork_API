import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// get all users
export const getUsers = async(_req: Request, res: Response) => {
  try {
    const users =await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

// get single user
export const getSingleUser = async(req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId})
        .select('-__v');

        if (!user) {
            res.status(404).json({ message: 'User could not be found' });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// create a new user
export const createUser = async(req: Request, res: Response) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// update a user
export const updateUser = async(req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId},
            { $set: req.body },
            {new: true}
        );

        if (!user) {
            res.status(404).json({ message: 'User could not be found'});
        }
        res.json(user);

    } catch (err) {
        res.status(500).json(err);
    }
}

// delete a user
export const deleteUser = async(req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            res.status(404).json({ message: 'User could not be found' });
        }

        // Delete the user's associated thoughts
        if (user) {
            await Thought.deleteMany({ username: user.username });
        }

        res.json({ message: 'User has been deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// add a friend
export const addFriend = async(req: Request, res: Response) => {
    try {
        if (req.body.friendId) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body.friendId } },
                { new: true }
            );
            res.json(updatedUser);
        } else {
            res.status(400).json({ message: 'Friend ID is required' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// remove a friend
export const removeFriend = async(req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}
