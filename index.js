// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import roleRoute from './routes/role.js';
// import authRoute from './routes/auth.js';
// import userRoute from './routes/user.js';
// import cookieParser from 'cookie-parser';
// import taskRoute from './routes/task.js';
// const app = express();
// dotenv.config();

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//     origin: 'https://warehouseqc.netlify.app/',
//     credentials: true
// }));
// app.use("/api/role", roleRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/user", userRoute);
// app.use("/api/task", taskRoute);

// //Response Handler Middleware

// app.use((obj, req, res, next)=>{
//     const statusCode = obj.status || 500;
//     const message = obj.message || "Something went wrong!";
//     return res.status(statusCode).json({
//         success: [200,201,204].some(a=> a === obj.status) ? true : false,
//         status: statusCode,
//         message: message,
//         data: obj.data
//     });
// });


// //DB Connection
// const connectMongoDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL);
//         if(process.argv.includes("--seed")){
//             await seedBooksData();
//         }
//         console.log("Connected to Database!");
//     } catch (error) {
//         throw error;
//     }
// }
// app.listen(8800, ()=>{
//     connectMongoDB();
//     console.log("Connected to backend!");
// });

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import taskRoute from './routes/task.js';
import cookieParser from 'cookie-parser';

dotenv.config(); 
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://warehouseqc.netlify.app',  
    credentials: true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
}));

// Enable preflight for all routes
app.options('*', cors());

// Routes
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: [200, 201, 204].includes(statusCode),
        status: statusCode,
        message: message,
        data: err.data || null,
    });
});

// Database Connection
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
};

// Server
const PORT = process.env.PORT || 8800;
app.listen(PORT, async () => {
    await connectMongoDB();
    console.log(`Server running on port ${PORT}`);
});

