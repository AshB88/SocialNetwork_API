import {Router} from 'express';

const router = Router();

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    removeThoughts,
    addFriend,
    removeFriend
} from '../../controllers/userController';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser&&removeThoughts);

// /api/users/:userId/friends/:friendId
router.route('/').post(addFriend).delete(removeFriend);

export default router;