import { Request, Response } from "express";
import { UserServices } from "./user.service";

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

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
