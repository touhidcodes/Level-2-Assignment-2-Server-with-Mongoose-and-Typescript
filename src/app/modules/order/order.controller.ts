import { Request, Response } from "express";
import UserModel from "../user/user.model";

const createOrder = async (req: Request, res: Response) => {
  // get data
  const { userId } = req.params;
  const { productName, price, quantity } = req.body;

  try {
    // Find the user by ID
    const user = await UserModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    // Check if the 'orders' property exists; if not, create it
    if (!user.orders) {
      user.orders = [];
    }

    // Append the new order to the 'orders' array
    user.orders.push({
      productName,
      price,
      quantity,
    });

    // Save the updated user document
    await user.save();

    // Respond with success message
    res.status(400).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: {
        code: 500,
        description: "Internal Server Error",
      },
    });
  }
  // //  call service
  // const result = await OrderServices.createOrderIntoDB();
};

export const OrderControllers = {
  createOrder,
};
