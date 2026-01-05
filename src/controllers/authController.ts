import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { db } from '../db/index.ts'
import { users, type NewUser } from '../db/schema.ts'
import { hashPassword } from '../utils/passwords.ts'
import { generateToken } from '../utils/jwt.ts'

export const register = async (req: Request<any, any, NewUser>, res: Response) => {
    try {
        const { email, username, password, firstName, lastName } = req.body
        const hashedPassword = await hashPassword(password)

        const [user] = await db.insert(users).values({
            email,
            username,
            password: hashedPassword
        }).returning({
            id: users.id,
            email: users.email,
            username: users.username,
            firstName: users.firstName,
            lastName: users.lastName,
            createdAt: users.createdAt,
        })

        const token = await generateToken({
            id: user.id,
            email: user.email,
            username: user.username,
        })

        // Now immediately generate a token for the user
        res.status(201).json({
            message: 'User created successfully',
            user,
            token
        })


    } catch (error) {
        console.error('Registration error', error)
        res.status(500).json({ error: 'Failed to create user' })
    }
}


// These are handlers that go into our routes that we created in express
// When this route happens run this function, and this function is the controller