import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/", UserControllers.createUser);
router.get("/", UserControllers.getAllUsers);
router.get("/:userId", UserControllers.getSingleUser);
router.put("/:userId", UserControllers.updateUser);
router.patch("/:userId", UserControllers.deleteUser);

router.post("/:userId/orders", UserControllers.createOrder);
router.get("/:userId/orders", UserControllers.getAllOrder);
export const UserRoutes = router;
