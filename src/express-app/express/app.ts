import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import express from "express";
import loginRoute from './routes/auth'
import usersRoute from './routes/users'
import foodOptionsRoute from './routes/foodOptions'

require('dotenv').config({path: '../../.env'});

const app = express()

app.use(express.json())

const unless = (middleware: Function, ...paths: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
        const pathCheck = paths.some(path => path === req.path)

        pathCheck ? next() : middleware(req, res, next)
    }

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ error: 'Authentication token missing' })
    }

    jwt.verify(token, process.env.SECRET_KEY!,
        (err, user) => {
        if (err) {
            return res.status(403).json({error: 'Token is invalid'})
        }

        req.user = user
        next()
    })
}

app.get('/', (req: Request, res: Response) => {
    res.send('Test')
})

app.use(unless(authenticateToken,'/api/auth/login', '/api/docs', '/api/docs.json'))

app.use('/api/auth', loginRoute)
app.use('/api/users', usersRoute)
app.use('/api/foodOptions', foodOptionsRoute)

export default app