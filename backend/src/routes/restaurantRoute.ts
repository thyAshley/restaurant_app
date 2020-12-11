import express from "express";
import fs from "fs";
import path from "path";

import Restaurant from "../models/restaurantModel";
import {
  getRestaurant,
  getRestaurantById,
  getRestaurantByUser,
  createRestaurantByUser,
} from "../controllers/restaurantController";
import uploadMiddleware from "../middleware/uploadMiddleware";

const router = express.Router();

router.route("/").get(getRestaurant).post(createRestaurantByUser);

router.get("/:restaurantId", getRestaurantById);
router.get("/owner/:userId", getRestaurantByUser);

router.post(
  "/:restaurantId/upload",
  uploadMiddleware.array("file", 3),
  async (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (restaurant) {
        const file: any = req.files;
        if (!file) {
          const error = new Error("Please upload a file");
          return next(error);
        }
        console.log(file);
        if (file[0] && restaurant && restaurant.images && restaurant.images[0])
          fs.unlinkSync(
            path.join(
              __dirname,
              "../../",
              "public",
              "restaurants",
              restaurant.images[0]
            )
          );
        if (file[1] && restaurant && restaurant.images && restaurant.images[1])
          fs.unlinkSync(
            path.join(
              __dirname,
              "../../",
              "public",
              "restaurants",
              restaurant.images[1]
            )
          );
        if (file[2] && restaurant && restaurant.images && restaurant.images[2])
          fs.unlinkSync(
            path.join(
              __dirname,
              "../../",
              "public",
              "restaurants",
              restaurant.images[2]
            )
          );

        restaurant!.images = [
          file[0]?.filename ||
            (restaurant.images ? restaurant.images[0] : null),
          file[1]?.filename ||
            (restaurant.images ? restaurant.images[1] : null),
          file[2]?.filename ||
            (restaurant.images ? restaurant.images[2] : null),
        ];
        const result = await restaurant.save();
        return res.send(result);
      }
      res.status(401);
      next(new Error("Restaurant Not Found, Please Try Again"));
    } catch (error) {
      next(new Error("Something went wrong"));
    }
  }
);

export default router;
