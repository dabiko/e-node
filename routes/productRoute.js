const express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    addToWishlist,
    rating,
    uploadImages
} = require("../controller/productController");
const {uploadPhoto, productImgResize} = require("../middlewares/uploadImages");

router.post("/", authMiddleware, isAdmin, createProduct);
router.put(
    "/upload/:id",
    authMiddleware,
    isAdmin,
    uploadPhoto.array('images',10),
    productImgResize,
    uploadImages
);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);




module.exports = router;