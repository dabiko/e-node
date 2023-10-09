const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUserController,
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
    updateSingleUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout
} = require('../controller/userController')
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");


router.post('/register', createUser);
router.post('/login', loginUserController);
router.get('/all-users', getAllUsers);
router.get('/:id', authMiddleware, isAdmin, getSingleUser);
router.delete('/:id', authMiddleware, isAdmin, deleteSingleUser);
router.put('/:id', authMiddleware, isAdmin, updateSingleUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);
router.get('/refresh-token', handleRefreshToken);
router.get('/logout', logout);
module.exports=router;