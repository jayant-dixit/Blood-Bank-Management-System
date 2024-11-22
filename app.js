import express from 'express';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler.js';
import userRoutes from './routes/user.routes.js';
import bloodBankRoutes from './routes/bloodBank.routes.js';
import cors from 'cors';


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}))

// routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bloodbank', bloodBankRoutes)


app.use(errorHandler)

export default app;
