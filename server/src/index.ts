import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRoute from "./routes/userRoute";
import adminRoute from "./routes/adminRoute";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  cors({
    origin: process.env.LOCAL_URL as string,
    credentials: true,
  })
);

app.use("/api/v1", userRoute);
app.use("/api/v1", adminRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
