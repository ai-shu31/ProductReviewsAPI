const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
        trim: true
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    category: {
        type: String,
        enum: ["mobile", "laptop", "fashion", "food", "other"],
        default: "other"
    },

    recommended: {
        type: Boolean,
        default: false
    },

    reviewedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Review", reviewSchema);