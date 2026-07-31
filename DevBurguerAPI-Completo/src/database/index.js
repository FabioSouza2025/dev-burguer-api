import { Sequelize } from "sequelize";
import mongoose from "mongoose";

import configDatabase from "../config/database";

import User from "../app/models/User";
import Product from "../app/models/Products";
import Category from "../app/models/Category";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }
  init() {
    this.connection = new Sequelize(configDatabase);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );
  }

  async mongo() {
    try {
      this.mongoConnection = await mongoose.connect(
        process.env.MONGO_URI || "mongodb://localhost:27017/devburger",
      );
    } catch (error) {
      console.warn("MongoDB connection skipped:", error.message);
    }
  }
}

export default new Database();
