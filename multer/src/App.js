import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { rateLimit } from "express-rate-limit";
import path from "path";
import cron from "node-cron";
import fileModel from "./Models/fileUploadModel.js";
import admin from "firebase-admin";
import { readFileSync, existsSync, mkdirSync } from "fs";
// import serviceAccount from "../my-first-project-e5455-firebase-adminsdk-sn2yx-c791c3a5fe.json" assert { type: "json" };
import serviceAccount from "../store-data-project-7ea8c-firebase-adminsdk-onik6-98c982d266.json" assert {type: "json"};

dotenv.config();

const api = express();
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

admin.initializeApp({//firebase
  credential: admin.credential.cert(serviceAccount),
  // storageBucket: "my-first-project-e5455.appspot.com",
  storageBucket:"gs://store-data-project-7ea8c.appspot.com"
});

const bucket = admin.storage().bucket();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  statusCode: 908,
  message: "rate limit failure",
});
// Apply the rate limiting middleware to all requests.
api.use(limiter);

api.use(
  cors({
    methods: "*",
    origin: "*",
    allowedHeaders: "*",
    exposedHeaders: "*",
    preflightContinue: true,
  })
);

// Function to create directories if they don't exist.........and create a folder direct
const ensureDirectoriesExist = () => {
  const directories = [
    "src/ASSETS/PDF",
    "src/ASSETS/Images",
    "src/ASSETS/Videos",
  ];

  directories.forEach((dir) => {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  });
};

// Ensure directories exist before setting up multer
ensureDirectoriesExist();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("file is uploading >>", file);
    const ext = path.extname(file.originalname).toLowerCase();

    if (ext === ".pdf") {
      cb(null, "src/ASSETS/PDF");

      } else if ([".mp4", ".avi", ".mkv"].includes(ext)) {
      cb(null, "src/ASSETS/Videos");

      } else if([".jpg",".jpeg", ".png"].includes(ext)) {
      cb(null, "src/ASSETS/Images");
    }
  },

  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname);
    req.body.extension = extName.slice(1); // remove the leading dot
    const uuid = uuidv4();
    req.body.uuid = uuid;
    cb(null, `${uuid}${extName}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 104857600 },
});

api.get("/server-status", (req, res) => {
  try {
    res.send("server is live");
  } catch (error) {
    res.send(error);
  }
});

// api.use(userRouter);

api.get("/getImage/:uuid", async (req, res) => {
  console.log("1111");
  try {
    const fileData = await fileModel.findOne({ uuid: req.params.uuid });

    if (!fileData) {
      return res.status(404).send("File not found");
    }

    let folderName;
    if (fileData.ext_name.toLowerCase() === "pdf") {
      folderName = "PDF";
    } else if (["mp4", "avi", "mkv"].includes(fileData.ext_name.toLowerCase())) {
      folderName = "Video";
    } else {
      folderName = "Images";
    }

    const filePath = path.resolve(`./src/ASSETS/${folderName}/${req.params.uuid}.${fileData.ext_name}`);
    res.sendFile(filePath);
  } catch (error) {
    console.log("error == ", error);
    res.status(500).send(error);
  }
});

// api.post("/upload/image", upload.array("file"), async (req, res) => {//this api is run in the postman only
//   try {
//     const FileObjectforDb = new fileModel({
//       ext_name: req.body.extension,
//       uuid: req.body.uuid,
//     });

//     const savedData = await FileObjectforDb.save();
//     res.send(savedData);
//   } catch (error) {
//     res.status(500).send({
//       error: error.message,
//       status: 500,
//     });
//   }
// });
api.get('/', (req, res) => {//without postman upload image/video/pdf...in firebase
  res.status(204).end(); // Respond with no content
});
const db = admin.firestore(); // Initialize Firestore

api.post('/upload/data', async (req, res) => {//this api add (store) data on firebase/firestore
  try {
    // const userId = req.params.id;

      const { name, email, std } = req.body;

      const docRef = db.collection('users').doc();  // Create a new document reference
      await docRef.set({
          name,
          email,
          std
      });

      res.status(200).json({ message: 'User data uploaded successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

api.patch('/patch/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    const userRef = db.collection('users').doc(userId);

    await userRef.update(updates);
    res.status(200).json({ message: 'User data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

api.options('/options/data', async (req, res) => {
  try {
    const { name, email, std } = req.body;

    const docRef = db.collection('users').doc();  // Create a new document reference
    await docRef.set({
      name,
      email,
      std
    });

    res.status(200).json({ message: 'User data uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



api.delete('/delete/user/:id', async (req, res) => {// this api delete data on firebase/firestore
  try {
      const userId = req.params.id;
      const userRef = db.collection('users').doc(userId);
      await userRef.delete();
      res.status(200).json({ message: 'User data deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
})


api.post("/upload/file", upload.single("file"), async (req, res) => {//this api is run first postman and store firebase
  try {
    const { file } = req;
    const storageRef = bucket.file(`uploads/${file.originalname}`);
    const fileBuffer = readFileSync(file.path);
    await storageRef.save(fileBuffer, { contentType: file.mimetype });
    const [downloadURL] = await storageRef.getSignedUrl({
      action: "read",
      expires: "03-01-2500",
    });
    res.status(200).json({ message: "File uploaded successfully", downloadURL });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

api.get("/getAllData", async (req, res) => {
  try {
    const filesData = await fileModel.find();
    res.send(filesData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// cron.schedule("*/1 * * * *", async () => {
//   console.log("one minute cron job");

//   const rawData = await fileModel.find();
//   console.log("rawdata ==== ", rawData);
// }, {
//   timezone: "Asia/Kolkata",
//   runOnInit: true,
// });

const serverPort = process.env.server_port;
api.listen(serverPort, () => {
  console.log("server successfully connected at port no. ", serverPort);
});
