import { Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import exclude from "../utils/exclude";

export const login = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const admin = await prisma.admin.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!admin) {
      return res.status(400).json("Admin doesn't exists!");
    }

    const validPass = await bcrypt.compare(data.password, admin.password);
    if (!validPass) {
      return res.status(400).json("Password doesn't match!");
    }

    const admin_data = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };

    const accessToken = jwt.sign(admin_data, process.env.TOKEN_SECRET!, {
      expiresIn: "10s",
    });
    const adminRefreshToken = jwt.sign(admin_data, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    await prisma.admin.update({
      where: {
        id: admin.id,
      },
      data: {
        refreshToken: adminRefreshToken,
      },
    });

    res.cookie("jwt", adminRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const adminWithoutPass = exclude(admin, ["password", "refreshToken"]);
    res.status(200).json({
      message: `${admin?.role} AUTHENTICATED!`,
      accessToken,
      admin: adminWithoutPass,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const adminExists = await prisma.admin.findFirst({
      where: {
        email: data.email,
      },
    });

    if (adminExists) return res.status(400).send("Admin already registered!");

    const hashPass = await bcrypt.hash(data.password, 12);

    await prisma.admin.create({
      data: {
        ...data,
        password: hashPass,
      },
    });

    res.status(200).send("Registered Successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  //* Is refreshToken in db?
  const foundUser = await prisma.admin.findFirst({
    where: {
      refreshToken: refreshToken,
    },
  });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }

  //* Delete refreshToken in db
  await prisma.admin.update({
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

export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundAdmin = await prisma.admin.findFirst({
    where: {
      refreshToken,
    },
  });

  if (!foundAdmin) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.TOKEN_SECRET!, (err: any, decoded: any) => {
    if (err || foundAdmin?.email !== decoded.email) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      {
        admin_data: {
          id: foundAdmin.id,
          email: foundAdmin.email,
          role: foundAdmin.role,
        },
      },
      process.env.TOKEN_SECRET!,
      {
        expiresIn: "10s",
      }
    );
    const adminWithoutPass = exclude(foundAdmin, ["password", "refreshToken"]);
    res.json({ admin: adminWithoutPass, accessToken });
  });
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.count();
    const admins = await prisma.admin.count();
    res.status(200).json({ users, admins });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await prisma.admin.count();
    res.status(200).json(admins);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getAllRegisteredAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });
    res.status(200).json(admins);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
