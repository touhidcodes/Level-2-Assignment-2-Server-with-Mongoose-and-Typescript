import { Request, Response } from "express";
import { UserServices } from "./user.service";
import User from "./user.model";
import TUserValidation from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const zodParseData = TUserValidation.parse(user);
    const result = await UserServices.createUserIntoDB(zodParseData);
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

    res.status(201).json({
      success: true,
      message: "User created successfully!",
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
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found",
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await User.isUserExists(Number(userId));

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
    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found",
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userData = req.body;
  try {
    const user = await User.isUserExists(Number(userId));

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
    const result = await UserServices.updateUserIntoDB(userId, userData);
    res.status(200).json({
      success: true,
      message: "Users updated successfully!",
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
  const { userId } = req.params;
  try {
    const user = await User.isUserExists(Number(userId));

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

    await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "Users deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found",
      },
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.isUserExists(Number(userId));

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
  const { userId } = req.params;
  try {
    const user = await User.isUserExists(Number(userId));

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
    const result = await UserServices.getOrderFromDB(userId);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
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

const getTotalPrice = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.isUserExists(Number(userId));
    if (!user) {
      res.status(500).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
    const totalPrice = await UserServices.getTotalPriceFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice,
      },
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
  getTotalPrice,
};
