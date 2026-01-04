import { Router } from "express";
import { validateBody } from "../middleware/validation.ts";
import { validateParams } from "../middleware/validation.ts";
import { validateQuery } from "../middleware/validation.ts";
import { z } from "zod";

const createHabitSchema = z.object({
    name: z.string(),
    description: z.string(),
})

const completeHabbitParams = z.object({
    id: z.string().max(3),
})

const completeHabbitSchema = z.object({
    date: z.date(),
})

const router = Router();

// Note here since we are not sending any status code, it is going to default to 200
router.get('/', (req, res) => {
    // Note: Status code range 200 means good and 201 technically means successful POST request
    res.json({ message: 'Habbits' })
})

router.get('/:id', (req, res) => {
    // Note: Status code range 200 means good and 201 technically means successful POST request
    res.json({ message: 'Habit' })
})

router.post('/', validateBody(createHabitSchema), (req, res) => {
    res.json({ message: 'Habbit created' })
})

router.delete('/:id', (req, res) => {
    res.json({ message: 'Habbit deleted' })
})

router.post('/:id/complete', validateBody(completeHabbitSchema), validateParams(completeHabbitParams), (req, res) => {
    res.json({ message: 'Habbit completed' })
})

export default router
