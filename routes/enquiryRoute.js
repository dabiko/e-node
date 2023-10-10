const express = require("express");
const {
    createEnquiry,
    getAllEnquiry,
    getEnquiry,
    updateEnquiry,
    deleteEnquiry,
} = require("../controller/enquiryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);
router.get("/:id", getEnquiry);
router.get("/", getAllEnquiry);

module.exports = router;