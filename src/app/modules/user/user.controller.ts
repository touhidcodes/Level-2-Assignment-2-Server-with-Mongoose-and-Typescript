import { Request, Response } from "express";
import { UserServices } from "./user.service";
import User from "./user.model";

const createUser = async (req: Request, res: Response) => {
  try {
    // get data
    const { user } = req.body;

    //  call service
    const result = await UserServices.createUserIntoDB(user);

    // Destructure the user object and omit the 'password' property
    const {
      userId,
      username,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    } = result;

    //  send response
    res.status(201).json({
      success: true,
      message: "User is created successfully",
      data: {
        userId,
        username,
        fullName,
        age,
        email,
        isActive,
        hobbies,
        address,
      },
    });
  } catch (error) {
    //     success: false,
    //     message: "User not created",
    //     error: {
    //         code: 404,
    //         description: "User not created!"
    // }
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUserFromDB();

    res.status(200).json({
      success: true,
      message: "Users fached successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const result = await UserServices.updateUserIntoDB(userId, userData);
    res.status(200).json({
      success: true,
      message: "Users updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "Users deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const createOrder = async (req: Request, res: Response) => {
  // get data
  const { userId } = req.params;
  const { productName, price, quantity } = req.body;

  try {
    // Find the user by ID
    const user = await User.findOne({ userId });

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
    return res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
};
