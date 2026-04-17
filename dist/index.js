import express from "express";
import cors from "cors";
import coolieParser from "cookie-parser";
import router from "./routes/index.js";
const app = express();
app.use(coolieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Urban Farming API is running");
});
// Routes
app.use('/api/v1', router);
export default app;
//# sourceMappingURL=index.js.map