import express from "express";
import {
  getUserById,
  getUserByQR,
  handleRefreshToken,
  login,
  logout,
  signup,
  verifyOTP,
} from "../controllers/userController";

const router = express.Router();

router.post("/user/signup", signup);
router.post("/user/login", login);
router.post("/user/verify", verifyOTP);
router.get("/user/logout", logout);
router.get("/user/refresh", handleRefreshToken);

router.get("/user/:id", getUserById);
router.get("/user/qr/:userId", getUserByQR);
export default router;
