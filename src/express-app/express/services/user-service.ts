import {Request, Response} from "express";
import {models} from "../../sequelize/db-service";
import {hashString} from "../../util/hashString";

export const list = async (req: Request, res: Response) => {
    const foodOptions = await models.User.findAll()

    res.status(200).json(foodOptions)
}

export const getById = async (req: Request, res: Response) => {
    const id = req.params.id
    const foodOption = await models.User.findByPk(id)

    if (foodOption) {
        res.status(200).json(foodOption)
    } else {
        res.status(404).json({error: `User with id: ${id} not found`})
    }
}

export const create = async (req: Request, res: Response) => {
    if (req.body) {
        req.body.password = hashString(req.body.password)

        await models.User.create(req.body)

        res.status(201).json(req.body)
    } else {
        res.status(400).send('Invalid body')
    }
}

export const update = async (req: Request, res: Response) => {
    const id = req.params.id

    if (req.body) {
        await models.User.update(req.body, {
            where: {id: id}
        })
        res.status(200).json(models.User.findByPk(id))
    } else {
        res.status(400).send('Invalid body')
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        await models.User.destroy(
            {where: {id: id}
            })
    } catch (err) {
        const error = err as Error
        res.status(400).send({
            code: error?.message,

        })
    }
}