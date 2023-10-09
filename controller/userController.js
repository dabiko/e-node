const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utilities/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshToken");

const createUser = asyncHandler(
    async (req, res) => {
        const email = req.body.email;
        const findUser = await  User.findOne({email: email});
        if (!findUser){
            const newUser = await User.create(req.body)
            res.json(newUser);
        }else {
           throw new Error('User already exist');
        }
    }
);

//Login a User
const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // checking id user exist or not;
    const findUser = await User.findOne({ email });

    if (findUser && (await findUser.isPasswordMatched(password))){
        const refreshToken = await generateRefreshToken(findUser?._id);
        await User.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });

        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    }else {
        throw new Error("Invalid Credentials");
    }
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

// Get a single user
const getSingleUser = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongoDbId(id);

    try {
        const getOneUser = await User.findById(id);
        res.json({
            getOneUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// Delete User
const deleteSingleUser = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongoDbId(id);

    try {
        const deleteOneUser = await User.findByIdAndDelete(id);
        res.json({
            deleteOneUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// Update a user
const updateSingleUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const updateOneUser = await User.findByIdAndUpdate(
            _id,
            {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            }
        );
        res.json(updateOneUser);
    } catch (error) {
        throw new Error(error);
    }
});

// Block User
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const blockedUser = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.json(blockedUser);
    } catch (error) {
        throw new Error(error);
    }
});

// unblock User
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true,
            }
        );
        res.json({
            message: "User UnBlocked",
        });
    } catch (error) {
        throw new Error(error);
    }
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error(" No Refresh token present in db or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token");
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    });
});

// logout functionality
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); // forbidden
    }
    await User.findOneAndUpdate(refreshToken, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204); // forbidden
});

module.exports={
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

}