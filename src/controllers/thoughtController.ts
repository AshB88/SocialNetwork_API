import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// get all thoughts
export const getThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find().select('-__v');
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}
// get single thought
export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'Thought could not be found' });
        }

        return res.json(thought);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// create a new thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const dbThoughtData = await Thought.create(req.body);

        // Push the created thought's _id to the associated user's thoughts array field
        const updatedUser = await User.findOneAndUpdate(
            { username: req.body.username },
            { $push: { thoughts: dbThoughtData._id } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User could not be found' });
        }

        return res.json(dbThoughtData);

    } catch (err) {
        return res.status(500).json(err);
    }
}

// update thought
export const updateThought = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body },
            { new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'Thought could not be found' });
        }

        res.json(thought);

    } catch (err) {
        res.status(500).json(err);
    }
}

// delete thought
export const deleteThought = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            res.status(404).json({ message: 'Thought could not be found' });
        }

        // Delete the thought from the associated user's thoughts array field
        if (thought) {
            await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } }
            );
        }

        res.json({ message: 'Thought deleted' });

    } catch (err) {
        res.status(500).json(err);
    }
}

// add reaction
export const addReaction = async (req: Request, res: Response) => {
    try {
        // Check if the username exists in the User collection
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(404).json({ message: 'Invalid username. Reaction could not be added' });
        }

        // Add the reaction to the thought
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );

        return res.json(thought);

    } catch (err) {
        return res.status(500).json(err);
    }
}

// delete reaction
export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'Thought could not be found' });
        }

        // Check if the reaction was actually removed
        const reactionExists = thought.reactions.some(
            (reaction) => reaction.reactionId.toString() === req.params.reactionId
        );

        if (reactionExists) {
            return res.status(404).json({ message: 'Reaction could not be found' });
        }

        return res.json({ message: 'Reaction deleted' });
    } catch (err) {
        return res.status(500).json(err);
    }
}