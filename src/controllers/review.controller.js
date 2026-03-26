const Review = require('../models/Review');

/*
GET /reviews
- If user is lawyer → return reviews for that lawyer
- If user is client → return reviews written by that client
*/
exports.getAll = async (req, res) => {
    try {
        const user = req.user;

        let filter = {};

        if (user.role === 'lawyer') {
            filter.lawyerId = user._id;
        }

        if (user.role === 'client') {
            filter.clientId = user._id;
        }

        const reviews = await Review.find(filter)
            .populate('clientId', 'name email')
            .populate('lawyerId', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching reviews',
            error: error.message
        });
    }
};

/*
POST /reviews
- Only client can create a review
*/
exports.create = async (req, res) => {
    try {
        const { lawyerId, rating, comment } = req.body;

        // const clientId = req.user._id;
        const clientId = "65f1a2b3c4d5e6f789012345";

        const parsedRating = Number(rating);

        if (!lawyerId) {
            return res.status(400).json({
                success: false,
                message: 'lawyerId is required'
            });
        }

        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be a number between 1 and 5'
            });
        }

        const review = await Review.create({
            lawyerId,
            clientId,
            rating: parsedRating,
            comment
        });

        res.status(201).json({
            success: true,
            message: 'Review created successfully',
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating review',
            error: error.message
        });
    }
};

/*
PUT /reviews/:id
- Only the owner client can update their review
*/
exports.update = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const clientId = req.user._id;

        const { rating, comment } = req.body;

        const review = await Review.findOne({
            _id: reviewId,
            clientId
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found or unauthorized'
            });
        }

        if (rating !== undefined) {
            const parsedRating = Number(rating);

            if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
                return res.status(400).json({
                    success: false,
                    message: 'Rating must be between 1 and 5'
                });
            }

            review.rating = parsedRating;
        }

        if (comment !== undefined) {
            review.comment = comment;
        }

        await review.save();

        res.json({
            success: true,
            message: 'Review updated successfully',
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating review',
            error: error.message
        });
    }
};

/*
DELETE /reviews/:id
- Only the owner client can delete their review
*/
exports.remove = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const clientId = req.user._id;

        const review = await Review.findOneAndDelete({
            _id: reviewId,
            clientId
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found or unauthorized'
            });
        }

        res.json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting review',
            error: error.message
        });
    }
};