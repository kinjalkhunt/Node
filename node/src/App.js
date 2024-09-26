import express from 'express';
import dotenv from 'dotenv';
import './DB/mongoose.js'; 
import UserModel from './Models/userModel.js';
import cors from 'cors';
import productRouter from './Routers/productRouter.js';
import userRouter from './Routers/userRouter.js';
import VersionValidMW from './Middleware/VersionValidMW.js';
import path from "path"
dotenv.config();

const app = express();
const serverPort = process.env.SERVER_PORT;
app.use(express.urlencoded({ extends: true }))

app.use(express.json());

app.use(cors({
  methods: "*",
  origin: "*",
  allowedHeaders: "*",
  exposedHeaders: "*",
  preflightContinue: true,
}))
app.get("/download", (req, res) => {
  try {
    console.log("11111");
    const filePath = path.resolve("./src/Assets/aastha.png")
    res.download(filePath)
  } catch (error) {
    console.log(error.message);
    
  }
})
app.use(VersionValidMW)

app.use(productRouter);
app.use(userRouter);

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});


// import express from 'express';
// import yearMw from './Middleware/Middleware.js';
// import idMiddleware from './Middleware/idMiddleware.js';
// import storePassword from './Middleware/passwordMiddleware.js';


// const firstNode = express()
// firstNode.use(express.json())//inbuilt json joie tyare

// firstNode.get("/first", (req, res) => {

//     res.send("This is get endpoint")
// })

// firstNode.post("/first/api", (req, res) => {
//     try {
//         // console.log("first api");
//         console.log("fir-api request body==>", req.body);
//         res.send("This is the post endpoint ")
//         console.log("success");
//     }
//     catch (error) {
//         console.log("error in appjs");
//     }

// })
// firstNode.listen(3001, () => {

//     console.log("Hello Node")
// });


// import express from 'express';
// import cors from 'cors';

// const app = express();
// app.use(express.json()); // Built-in middleware for parsing JSON
// app.use(cors()); // Enable CORS for all routes

// // Sample user data
// const users = [
//   { email: 'kinjalpkhunt@gmail.com', password: 'kinjal90', username: 'kinjal khunt' }
// ];

// // Login endpoint
// app.post('/api/login', (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find(u => u.email === email && u.password === password);

//   if (user) {
//     res.status(200).json({ message: 'Login successful', user });
//   } else {
//     res.status(401).json({ message: 'Invalid email or password' });
//   }
// });

// app.listen(3001, () => {
//   console.log("Server running on port 3001");
// // });

// import express from 'express';
// import dotenv from "dotenv";

// dotenv.config()


// const firstapp = express();
// const serverPort = process.env.db_port ;
// firstapp.use(express.json());

// firstapp.post('/login',(req, res) => {
//   try {
//     res.send( 'Success' );
//     console.log("correct data");
//   } catch (error) {
//     console.log("error");
//   }
// });

// firstapp.get("/file/api1", (req, res) => {
//     res.send("Server is live");
// });

// firstapp.listen(serverPort, () => {
//     console.log(`Server is running on port ${serverPort}`);
// });



// import express from 'express';
// import dotenv from 'dotenv';
// // import { mongoose } from mongoose.js;
// import mongoose from './DB/mongoose.js'; // Adjust the path to your mongoose.js file
// import UserModel from './Models/model1.js'; // Adjust the path to your userModel.js file

// dotenv.config();

// const app = express();
// const serverPort = process.env.server_port || 3000;

// app.use(express.json());

// // Insert data route
// app.post('/create-user', async (req, res) => {
//     try {
//         const { name, std, mobileNumber, email } = req.body;

//         // Create a new user instance
//         const newUser = new UserModel({ name, std, mobileNumber, email });

//         // Save the new user to the database
//         await newUser.save();

//         res.send('User created successfully');
//         console.log("User created with data:", req.body);
//     } catch (error) {
//         console.error("Error creating user:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// app.get("/file/api1", (req, res) => {
//     res.send("Server is live");
// });

// app.listen(serverPort, () => {
//     console.log(`Server is running on port ${serverPort}`);
// });
