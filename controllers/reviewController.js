const mongoose = require("mongoose");
const Review = require("../models/review");

exports.getReviews = async (req, res, next) => {
    try {
        let query = {};

        // Filter by category
        if (req.query.category) {
            query.category = req.query.category;
        }

        let reviews = Review.find(query);

        // Sort by rating - lowest first
        if (req.query.sort === "rating") {
            reviews = reviews.sort({ rating: 1 });
        }

        const result = await reviews;

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};


// GET /reviews/:id
exports.getReviewById = async (req, res, next) => {
    try {
        const id = req.params.id;

        // Check whether ID format is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid id"
            });
        }

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        res.status(200).json(review);
    } catch (err) {
        next(err);
    }
};


// POST /reviews
exports.createReview = async (req, res, next) => {
    try {
        const review = await Review.create(req.body);

        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};


// PUT /reviews/:id
exports.updateReview = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid id"
            });
        }

        const review = await Review.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        res.status(200).json(review);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};


// DELETE /reviews/:id
exports.deleteReview = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid id"
            });
        }

        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        res.status(200).json(review);
    } catch (err) {
        next(err);
    }
};