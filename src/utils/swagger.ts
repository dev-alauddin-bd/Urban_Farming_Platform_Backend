import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const swaggerDocument = YAML.load(
    path.join(process.cwd(), "docs/swagger.yaml")
  );

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  console.log("📖 Swagger: https://urban-farming-platform-backend-rosy.vercel.app/api-docs");
};