import {Request, Response} from 'express'
  
import Review from '../models/reviewModel';
import Booking from '../models/bookingModel';

export const getReviewByRestaurantId = async (req:Request, res: Response) => {
    const restaurantId = req.params.restaurantId;
    console.log(restaurantId)
    try {
        const userReviews = await Review.find({restaurantId})
        return res.status(200).send(userReviews)
    } catch (error) {
        return res.status(500).send('Something went wrong, Please try again')
    }
}
export const addReview = async (req:Request, res:Response) => {
    try {
        const bookingDetail = await Booking.findById(req.params.bookingId)
        if (bookingDetail && bookingDetail.userId.toString() === res.locals.user._id.toString()) {
            const {rating, comment} = req.body;
            if (!bookingDetail.hasReview) {
                const userReview = new Review({
                    restaurantId: bookingDetail.restaurantId,
                    userId: res.locals.user._id,
                    bookingId: bookingDetail._id,
                    rating,
                    comment: comment || null
                })
                const result = await userReview.save();
                bookingDetail.hasReview = true;
                await bookingDetail.save();
                return res.send(result)
            } else {
                await Review.updateOne({bookingId: bookingDetail._id}, {rating, comment});
                return res.send('updated review')
            }
        }
        return res.status(500).send('Something went wrong, Please try again')
    } catch (error) {
        console.log(error)
    }
}