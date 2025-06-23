import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Whitelisted domains
const allowedOrigins = [
  'https://user-auth-client-seven.vercel.app',
  'http://localhost:5173' // Optional: helpful for local testing
];

// ✅ CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// ✅ Middleware (important: order matters!)
app.use(cors(corsOptions)); // CORS must come before routes
app.use(express.json());
app.use(cookieParser());

// ✅ API Endpoints
app.get('/', (req, res) => {
  res.send('API Working fine');
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// ✅ Start server
app.listen(port, () => {
  console.log('Server started on PORT:', port);
});
