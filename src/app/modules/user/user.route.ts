import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

//  user routes
router.post("/", UserControllers.createUser);
router.get("/", UserControllers.getAllUsers);
router.get("/:userId", UserControllers.getSingleUser);
router.put("/:userId", UserControllers.updateUser);
router.delete("/:userId", UserControllers.deleteUser);

//  order routes
router.put("/:userId/orders", UserControllers.createOrder);
router.get("/:userId/orders", UserControllers.getAllOrder);
router.get("/:userId/orders/total-price", UserControllers.getTotalPrice);

export const UserRoutes = router;
