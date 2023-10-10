const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const OrderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            count: Number,
            color: String,
        },
    ],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            "Not Processed",
            "Cash on Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered"
        ],
    },
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    timestamps: true,
});

module.exports = mongoose.model("Order", OrderSchema);