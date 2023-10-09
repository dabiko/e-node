const express = require("express");
const {
    createBlog,
    getAllBlogs,
    getBlog,
    deleteBlog,
    updateBlog,
    likeBlog,
    dislikeBlog,
    // uploadImages,

} = require("../controller/blogController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
//const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImage");
const router = express.Router();


router.post("/", authMiddleware, isAdmin, createBlog);

router.put("/like", authMiddleware, likeBlog);
router.put("/dislike", authMiddleware, dislikeBlog);

router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);







module.exports = router;