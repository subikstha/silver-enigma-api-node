import express from "express";
import authRoutes from "./routes/authRoutes.ts";
import habbitRoutes from "./routes/habitRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { isTest } from "../env.ts";


const app = express();
// Global Middleware
app.use(morgan('dev', {
    skip: () => isTest()
}))
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/health', (req, res) => {
    res.json({ message: 'hello from node' }).status(200)
})

app.use('/api/auth', authRoutes)
app.use('/api/habbits', habbitRoutes)
app.use('/api/users', userRoutes)

export { app }

export default app;