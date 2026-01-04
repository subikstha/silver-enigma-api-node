import { Router } from "express";

const router = Router();

router.post('/register', (req, res) => {
    // Note: Status code range 200 means good and 201 technically means successful POST request
    res.status(201).json({ message: 'User registered successfully' })
})

router.post('/login', (req, res) => {
    // Note: Status code range 200 means good and 201 technically means successful POST request
    res.status(201).json({ message: 'User logged in successfully' })
})

export default router