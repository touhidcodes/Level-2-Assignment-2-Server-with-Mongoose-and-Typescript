import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    // get data
    const { user } = req.body;

    //  call service
    const result = await UserServices.createUserIntoDB(user);

    //  send response
    res.status(200).json({
      success: true,
      message: "User is created successfully",
      data: result,
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
export const UserControllers = {
  createUser,
  getAllUsers,
};
