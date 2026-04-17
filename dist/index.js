import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import router from "./routes/index.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
const app = express();
// ================= CORS =================
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
// ================= MIDDLEWARE =================
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ================= STATIC FILE =================
app.use(express.static(path.join(process.cwd(), "public")));
// ================= ROOT UI =================
app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public/index.html"));
});
// ================= ROUTES =================
app.use("/api/v1", router);
// ================= ERROR HANDLER =================
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=index.js.map