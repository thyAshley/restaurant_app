import { Request, Response } from "express";

import Review from "../models/reviewModel";
import Booking from "../models/bookingModel";
import Restaurant from "../models/restaurantModel";

export const getReviewByRestaurantId = async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;
  console.log(restaurantId);
  try {
    const userReviews = await Review.find({ restaurantId });
    return res.status(200).send(userReviews);
  } catch (error) {
    return res.status(500).send("Something went wrong, Please try again");
  }
};
export const addReview = async (req: Request, res: Response) => {
  try {
    const bookingDetail = await Booking.findById(req.params.bookingId);
    const restaurant = await Restaurant.findById(bookingDetail!.restaurantId);
    if (
      restaurant &&
      bookingDetail &&
      bookingDetail.userId.toString() === res.locals.user._id.toString()
    ) {
      let { rating, comment } = req.body;
      const userReview = new Review({
        restaurantId: bookingDetail.restaurantId,
        userId: res.locals.user._id,
        bookingId: bookingDetail._id,
        rating: rating || 0,
        comment: comment || null,
      });
      if (!bookingDetail.hasReview) {
        const result = await userReview.save();
        bookingDetail.hasReview = true;
        await bookingDetail.save();
        if (restaurant && restaurant.review) {
          restaurant.review.count += 1;
          restaurant.review.rating = +(
            (restaurant.review.rating + userReview.rating) /
            restaurant.review.count
          ).toFixed(2);
        }
        await restaurant.save();
        return res.send(result);
      }
    }
    return res.status(500).send("Something went wrong, Please try again");
  } catch (error) {
    console.log(error);
  }
};
