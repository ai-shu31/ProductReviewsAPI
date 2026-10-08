const express = require("express");

const {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
} = require("../controllers/reviewController");

const errorHandler = require("../middleware/errorHandler");

const router = express.Router();

router.get("/", getReviews);

router.get("/:id", getReviewById);

router.post("/", createReview);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

router.use(errorHandler);

module.exports = router;