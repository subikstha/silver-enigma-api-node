import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'Users' })
})

router.get('/:id', (req, res) => {
    res.json({ message: 'Single User' })
})

router.post('/', (req, res) => {
    res.json({ message: 'User created' })
})

router.delete('/:id', (req, res) => {
    res.json({ message: 'User deleted' })
})

router.patch('/:id', (req, res) => {
    res.json({ message: 'User updated' })
})

export default router
