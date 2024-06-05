import { Request, Response } from "express";
import nodemailer from "nodemailer";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import exclude from "../utils/exclude";
import { calculateExpirationDate } from "../utils/calculateExpDate";
import GenerateQRCode from "../utils/generateQRCode";
import cloudinary from "../utils/cloudinary";
import jwt from "jsonwebtoken";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL!,
    pass: process.env.AUTH_PASS!,
  },
});

export const signup = async (req: Request, res: Response) => {
  try {
    const { newUser } = req.body;

    const userExists = await prisma.user.findFirst({
      where: {
        email: newUser.email,
      },
    });

    if (userExists) {
      return res.status(403).json("Email already registered!");
    }

    const hashPass = await bcrypt.hash(newUser.password, 12);

    const newCreatedUser = await prisma.user.create({
      data: {
        password: hashPass,
        ...newUser,
        emergencyPerson: {
          create: {
            ...newUser.emergencyPerson,
          },
        },
      },
    });

    //TODO: Generate Qr Code
    const qrCodeLink = `http://localhost:5173/user/${newCreatedUser.id}`;
    const qrCodeImage = await GenerateQRCode(qrCodeLink);

    const result = await cloudinary.uploader.upload(qrCodeImage, {
      folder: "new_pwd_qr_code",
    });

    await prisma.user.update({
      where: {
        id: newCreatedUser.id,
      },
      data: {
        qr_code: {
          create: {
            image_id: result.public_id,
            secure_url: result.secure_url,
          },
        },
      },
    });
    res.status(200).json("New user created!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userExists = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!userExists) {
      return res.status(403).json("User does not exists!");
    }

    const validPass = data.password === userExists.password;
    if (!validPass) {
      return res.status(400).json("Invalid password!");
    }

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOption = {
      from: process.env.AUTH_EMAIL!,
      to: data.email,
      subject: "Verfiy your email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the signup</p><p> This code <b>expires in 1 hour</b>.</p>`,
    };

    const hashOTP = await bcrypt.hash(otp, 10);

    await prisma.otp.create({
      data: {
        userId: userExists.id,
        otp: hashOTP,
        createdAt: new Date().toISOString(),
        expiredAt: calculateExpirationDate(),
      },
    });
    await transporter.sendMail(mailOption);
    res.status(200).json({
      status: "PENDING",
      message: "Verification otp email sent",
      id: userExists.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { userId, otp } = req.body;

    if (!otp || !userId) return res.status(400).json("Please input the otp code!");

    const otpRecord = await prisma.otp.findMany({
      where: {
        userId,
      },
    });

    if (otpRecord.length <= 0) {
      return res
        .status(403)
        .json("Account record doesn't exist or has been verified already. Please sign up or login");
    }

    const { expiredAt } = otpRecord[0];
    const hashOTP = otpRecord[0].otp;
    const now = new Date();
    const expirationDate = new Date(now.getTime());
    if (expiredAt < expirationDate.toISOString()) {
      await prisma.otp.deleteMany({ where: { userId } });
      return res.status(403).json("Code has expired. Please request again");
    }

    const validOTP = await bcrypt.compare(otp, hashOTP);

    if (!validOTP) {
      return res.status(403).json("Invalid code. Please check your inbox again");
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) return res.status(403).json("User does not exists!");

    await prisma.otp.deleteMany({
      where: {
        userId,
      },
    });

    const user_data = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(user_data, process.env.TOKEN_SECRET!, {
      expiresIn: "10s",
    });
    const userRefreshToken = jwt.sign(user_data, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: userRefreshToken,
      },
    });

    res.cookie("jwt", userRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userWithoutPass = exclude(user, ["password", "refreshToken"]);
    res.status(200).json({
      message: `${user?.role} AUTHENTICATED!`,
      accessToken,
      user: userWithoutPass,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundUser = await prisma.user.findFirst({
    where: {
      refreshToken,
    },
    include: {
      emergencyPerson: true,
      qr_code: true,
    },
  });

  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.TOKEN_SECRET!, (err: any, decoded: any) => {
    if (err || foundUser?.email !== decoded.email) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      {
        user_data: {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role,
        },
      },
      process.env.TOKEN_SECRET!,
      {
        expiresIn: "10s",
      }
    );

    const userWithoutPass = exclude(foundUser, ["password", "refreshToken"]);

    res.json({ user: userWithoutPass, accessToken });
  });
};

export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  //* Is refreshToken in db?
  const foundUser = await prisma.user.findFirst({
    where: {
      refreshToken,
    },
  });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }

  //* Delete refreshToken in db
  await prisma.user.update({
    where: {
      id: foundUser.id,
    },
    data: {
      refreshToken: null,
    },
  });

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.status(200).send("Cookie removed");
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        emergencyPerson: true,
        qr_code: true,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
