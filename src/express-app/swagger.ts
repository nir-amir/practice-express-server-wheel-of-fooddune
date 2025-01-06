import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from "swagger-jsdoc";
import {Express, Request, Response} from "express";

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'WheelOfFOODune API',
            description: 'WheelOfFOODune Information',
            version: '0.1'
        },
        servers: [
            {
                url: "http://localhost:3001/api"
            }
        ],
    },
    // TODO specify path to express/routes only
    apis: ['**/*.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app: Express,) => {
    try {
        // TODO make /docs accessible without token
        app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

        app.get('/api/docs.json', (req: Request, res: Response) => {
            res.setHeader('Content-Type', 'application/json')
            res.send(swaggerSpec)
        } )
    } catch (err) {
        console.error(err)
    }
}

export default swaggerDocs