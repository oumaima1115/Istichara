const Review = require('../models/Review');
const User = require('../models/User');

/*
GET /reviews
- If user is attorney → return reviews for that attorney
- If user is client → return reviews written by that client
*/
exports.getAll = async (req, res) => {
  try {
    const reviews = await Review.find(); 

    console.log("Reviews fetched:", reviews);

    res.json(reviews);
  } catch (error) {
    console.error("Error in getAll:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/*
POST /reviews
- Only client can create a review
*/
exports.create = async (req, res) => {
    try {
        const { attorneyId, rating, comment } = req.body;

        const clientId = req.user.id;

        const parsedRating = Number(rating);

        if (!attorneyId) {
            return res.status(400).json({
                success: false,
                message: 'attorneyId is required'
            });
        }

        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be a number between 1 and 5'
            });
        }

        const review = await Review.create({
            attorneyId,
            clientId,
            rating: parsedRating,
            comment
        });
        const attorney = await User.findById(attorneyId);
        attorney.reviews.push(review._id);
        await attorney.save();

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
        const clientId = req.user.id;

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
        const clientId = req.user.id;

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