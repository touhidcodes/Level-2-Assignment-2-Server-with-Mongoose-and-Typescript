import { Request, Response } from "express";
import { UserServices } from "./user.service";
import User from "./user.model";
import TUserValidation from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    // get data
    const { user } = req.body;

    //  zod validation
    const zodParseData = TUserValidation.parse(user);

    //  call service
    const result = await UserServices.createUserIntoDB(zodParseData);

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
    res.status(404).json({
      success: false,
      message: "User not created",
      error: {
        code: 404,
        description: "User not created",
      },
    });
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
  try {
    // get data
    const { userId } = req.params;
    const { productName, price, quantity } = req.body;
    await User.findOneAndUpdate(
      { userId },
      {
        $push: {
          orders: {
            productName,
            price,
            quantity,
          },
        },
      }
    );

    res.status(400).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error) {
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

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getOrderFromDB(userId);
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: { orders: result?.orders || [] },
    });
  } catch (error) {
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
  getAllOrder,
};
