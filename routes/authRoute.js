const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUser,
    loginAdmin,
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
    updateSingleUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    getWishlist,
    saveAddress,
    AddToCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    getAllOrders,
    getOrderByUserId,
    updateOrderStatus
} = require('../controller/userController')
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");


router.post('/register', createUser);
router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddleware, updatePassword);
router.post('/login', loginUser);
router.post("/admin-login", loginAdmin);
router.post("/add-to-cart", authMiddleware, AddToCart);
router.post("/apply-coupon", authMiddleware, applyCoupon);
router.post("/cash-order", authMiddleware, createOrder);
router.get('/all-users', getAllUsers);

router.get("/get-orders", authMiddleware, getOrders);
router.get("/all-orders", authMiddleware, isAdmin, getAllOrders);
router.post("/user-order/:id", authMiddleware, isAdmin, getAllOrders);

router.get('/one/:id', authMiddleware, isAdmin, getSingleUser);
router.get('/refresh-token', handleRefreshToken);
router.get('/logout', logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/user-cart", authMiddleware, getUserCart);

router.put('/:id', authMiddleware, isAdmin, updateSingleUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);

router.delete('/:id', authMiddleware, isAdmin, deleteSingleUser);
router.delete('/save-address', authMiddleware, saveAddress);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.put(
    "/update-order/:id",
    authMiddleware,
    isAdmin,
    updateOrderStatus
);




module.exports=router;