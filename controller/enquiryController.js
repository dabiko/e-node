const Enquiry = require("../models/enquiryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utilities/validateMongodbId");



const createEnquiry = asyncHandler(async (req, res) => {
    try {
        const newEnquiry = await Enquiry.create(req.body);
        res.json(newEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});



const getAllEnquiry = asyncHandler(async (req, res) => {
    try {
        const getEnquiries = await Enquiry.find();
        res.json(getEnquiries);
    } catch (error) {
        throw new Error(error);
    }
});



const getEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getOneEnquiry = await Enquiry.findById(id);
        res.json(getOneEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});


const updateEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});


const deleteEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
        res.json(deletedEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createEnquiry,
    getAllEnquiry,
    getEnquiry,
    updateEnquiry,
    deleteEnquiry,
};
