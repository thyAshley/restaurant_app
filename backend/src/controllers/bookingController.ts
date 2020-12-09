import { Request, Response, NextFunction } from "express";
import moment from "moment";

import Booking from "../models/bookingModel";
import Restaurant from "../models/restaurantModel";

export const makeBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, numberOfPax, time } = req.body;
  const restaurantId = req.params.restaurantId;
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return next(new Error("Invalid Restaurant ID, please try again"));
    }

    const bookingDetail = new Booking({
      userId: res.locals.user._id,
      restaurantId: restaurant._id,
      date: new Date(date),
      time: moment.utc(time, "HH:mm").format("HH:mm"),
      numberOfPax,
    });
    const result = await bookingDetail.save();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    return next(new Error("Something went wrong, please try again"));
  }
};

export const getBookingByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = res.locals.user._id;
  try {
    const newbookings = await Booking.find({ userId })
      .populate(
        "restaurantId",
        "name images address cuisine openingHours rating",
        "Restaurant"
      )
      .sort({ date: "asc", time: "asc" })
      .where("date")
      .gte(Date.now());
    const oldbookings = await Booking.find({ userId })
      .populate(
        "restaurantId",
        "name images address cuisine openingHours rating",
        "Restaurant"
      )
      .sort({ date: "asc", time: "asc" })
      .where("date")
      .lt(Date.now());
    res.status(200).json({ booking: { newbookings, oldbookings } });
  } catch (error) {
    console.error(error);
    res.status(500);
    next(new Error("something went wrong, please try again"));
  }
};

export const removeBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookingId = req.params.bookingId;
  try {
    await Booking.findOneAndDelete({ _id: bookingId });
    next();
  } catch (error) {
    res.status(500);
    next(new Error("something went wrong, please try again"));
  }
};

export const getBookingByRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const restaurantId = req.params.restaurantId;
  try {
    const bookings = await Booking.find({ restaurantId })
      .populate(
        "restaurantId",
        "name images address cuisine openingHours rating",
        "Restaurant"
      )
      .sort({ date: "asc", time: "asc" })
      .where("date")
      .lt(Date.now());
    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500);
    next(new Error("something went wrong, please try again"));
  }
};
