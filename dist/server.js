import config from "./config/index.js";
import app from "./index.js";
const port = config.port || 5000;
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    process.exit(1);
});
const startServer = () => {
    app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    });
};
startServer();
//# sourceMappingURL=server.js.map