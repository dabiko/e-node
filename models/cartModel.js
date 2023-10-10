const mongoose = require("mongoose"); // Erase if already required

const CartSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                count: Number,
                color: String,
                price: Number,
            },
        ],
        cartTotal: Number,
        totalAfterDiscount: Number,
        orderedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Cart", CartSchema);
