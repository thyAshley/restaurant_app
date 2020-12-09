import express from "express";

import { authMiddleWare } from "../middleware/authMiddleware";
import {
  makeBooking,
  getBookingByUser,
  removeBookingById,
  getBookingByRestaurant,
} from "../controllers/bookingController";

const router = express.Router();

router
  .route("/:restaurantId")
  .post(authMiddleWare, makeBooking)
  .get(getBookingByRestaurant);

router.get("/", authMiddleWare, getBookingByUser);
router.delete(
  "/:bookingId",
  authMiddleWare,
  removeBookingById,
  getBookingByUser
);

export default router;
