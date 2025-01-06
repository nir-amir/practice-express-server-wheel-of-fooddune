import {Request, Response} from "express";
import {sequelize, models} from "../../sequelize/db-service";
import {Op} from "sequelize";

const hasValidTimeFormat = (time: unknown) => {
    return typeof time === 'string' && time.length === 5 && time.charAt(2) === ':'
}

const findRandomFoodOption = async (time: string) =>
    await models.FoodOption.findAll({
        where: {
            [Op.and]: [
                {opens_at: {[Op.lte]: time}},
                {closes_at: {[Op.gte]: time}}
            ]
        },
        order: sequelize.random(), limit: 1,
    })


/**
 * @swagger
 * /api/foodOptions:
 *  get:
 *      description: List all foodOptions.
 *      responses:
 *          '200':
 *              description: Successful response
 *          '500':
 *              description: Internal server error
 */
export const list = async (req: Request, res: Response) => {
    const foodOptions = await models.FoodOption.findAll()

    res.status(200).json(foodOptions)
}

/**
 * @swagger
 * /api/foodOptions/:id:
 *  get:
 *      description: Get specific foodOption by id.
 *      parameters:
 *          - in: path
 *          name: id
 *          required: true
 *          description: FoodOption id
 *          schema:
 *              type: string
 *              format: uuid
 *      responses:
 *          '200':
 *              description: Successful response
 *          '404':
 *              description: FoodOption with this id could not be found
 *          '500':
 *              description: Internal server error
 */
export const getById = async (req: Request, res: Response) => {
    const id = req.params.id
    const foodOption = await models.FoodOption.findByPk(id)

    if (foodOption) {
        res.status(200).json(foodOption)
    } else {
        res.status(404).json({error: `FoodOption with id: ${id} not found`})
    }
}

/**
 * @swagger
 * /api/foodOptions/random:
 *  get:
 *      description: Get random foodOption that is currently open.
 *      responses:
 *          '200':
 *              description: Successful response
 *          '404':
 *              description: Random FoodOption not found
 *          '500':
 *              description: Internal server error
 */
export const getRandomNow = async (req: Request, res: Response) => {
    const currentTime = new Date().toTimeString().split(' ')[0]

    const foodOption = await findRandomFoodOption(currentTime)

    if (foodOption) {
        res.status(200).json(foodOption)
    } else {
        res.status(404).json({error: 'No foodOption found'})
    }
}

/**
 * @swagger
 * /api/foodOptions/random-specific-time:
 *  get:
 *      description: Get random foodOption that is open at a specific time.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json
 *                  schema:
 *                      type: object
 *                      properties:
 *                          time:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Successful response
 *          '400':
 *              description: Invalid time format
 *          '404':
 *              description: Random FoodOption not found
 *          '500':
 *              description: Internal server error
 */
export const getRandomSpecificTime = async (req: Request, res: Response) => {
    if (!hasValidTimeFormat(req.body.time)) {
        res.status(400).send('Bad request. Time is missing or invalid')
    }

    const foodOption = await findRandomFoodOption(req.body.time)

    if (foodOption) {
        res.status(200).json(foodOption)
    } else {
        res.status(404).send('No foodOption found')
    }
}

/**
 * @swagger
 * /api/foodOptions/create:
 *  get:
 *      description: Create new foodOption.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json
 *                  schema:
 *                      type: object
 *                      properties:
 *                          time:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Successful response
 *          '400':
 *              description: Invalid time format
 *          '404':
 *              description: Random FoodOption not found
 *          '500':
 *              description: Internal server error
 */
export const create = async (req: Request, res: Response) => {
    if (req.body) {
        await models.FoodOption.create(req.body)
        res.status(201).json(req.body)
    } else {
        res.status(400).send('Invalid body')
    }
}

export const update = async (req: Request, res: Response) => {
    const id = req.params.id

    if (req.body) {
        await models.FoodOption.update(req.body, {
            where: {id: id}
        })
        res.status(200).json(models.FoodOption.findByPk(id))
    } else {
        res.status(400).send('Invalid body')
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        await models.FoodOption.destroy(
            {where: {id: id}
            })
    } catch (err) {
        const error = err as Error
        res.status(400).send({
            code: error?.message,

        })
    }
}