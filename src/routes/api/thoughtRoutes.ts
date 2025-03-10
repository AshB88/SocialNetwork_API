import { Router } from 'express';
const router = Router();

import { 
    getThoughts, 
    getThoughtById, 
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} from '../../controllers/thoughtController';

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughId').get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

export default router;