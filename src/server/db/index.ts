import { DataSource } from "typeorm";
import { Product } from "../entity/product.entity";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "dev.sqlite",
  entities: [Product],
  synchronize: true,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established.");
  })
  .catch((error) => console.log("Error initializing database:", error));

export default AppDataSource;
