import "dotenv/config";
import connectDb from "./database/connectdb.js";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan"

import authRouter from "./routes/auth-route.js";
import deviceRouter from "./routes/device-route.js"

const app = express();

app.use(morgan("dev"))

const whiteList = ["http://localhost:3000"];

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin || whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback(
                "Error de CORS origin: " + origin + " No autorizado!"
            );
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/device", deviceRouter)
const PORT = process.env.PORT || 8080;

await connectDb()
app.listen(PORT, () => console.log("🍉🍉🍉 http://localhost:" + PORT));
