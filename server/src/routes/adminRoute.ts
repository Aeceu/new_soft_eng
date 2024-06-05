import express from "express";
import {
  login,
  logout,
  signup,
  handleRefreshToken,
  getAllUsers,
  getAllAdmins,
  getAllRegisteredAdmins,
} from "../controllers/adminController";

const router = express.Router();

router.post("/admin/signup", signup);
router.post("/admin/login", login);
router.get("/admin/logout", logout);
router.get("/admin/refresh", handleRefreshToken);

router.get("/users", getAllUsers);
router.get("/admins", getAllAdmins);
router.get("/registeredAdmins", getAllRegisteredAdmins);

export default router;
