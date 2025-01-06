import {models} from "../../sequelize/db-service";
import bcrypt from "bcryptjs";
import {Request, Response} from "express";
import {UserInstance} from "../../types/User";
import jwt from "jsonwebtoken";

const authenticateUser = async (username: string, password:string): Promise<UserInstance | null> => {
    const user = await models.User.findOne({where: {name: username}}) as UserInstance

    if (!user) return null

    if (bcrypt.compareSync(password, user.password)) {
        return user
    }

    return null
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body

    const user = await authenticateUser(username, password)

    if (!user) {
        return res.status(401).json({error: 'Authentication failed'})
    }

    const token = jwt.sign(
        {userId: user.id, username: user.name},
        process.env.SECRET_KEY!, {
            // TODO reduce time
            expiresIn: '24h'
        })

    res.json({token})
}