
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import path from 'path';
// import { Customer } from '../ENTITIES/ADMIN/customer';
// import { Order } from '../ENTITIES/ADMIN/Order';
import { StudentMarks } from '../ENTITIES/ADMIN/StudentMarks';
import { studentDetail } from '../ENTITIES/ADMIN/StudentDetail';
import { ALL } from 'dns';

// Load environment variables from .env file
dotenv.config();

// Create a DataSource instance
const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!,10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [StudentMarks, studentDetail],
  // entities: [path.resolve(__dirname,'../ENTITIES/**/*.ts')], // Corrected path
  synchronize: false, // Automatically create database schema
  logging: 'all',
  migrations: [path.join(__dirname, '../migrations/**/*.ts')],
  subscribers: [],
  migrationsRun:true,

});
export default AppDataSource; // Default export


