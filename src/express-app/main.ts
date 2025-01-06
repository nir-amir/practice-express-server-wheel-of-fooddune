import swaggerDocs from "./swagger";
import app from './express/app'
import {sequelize} from "./sequelize/db-service";
// @ts-ignore
import serverlessExpress from '@vendia/serverless-express';
import {APIGatewayProxyEvent, Context} from "aws-lambda";
import 'dotenv/config'

const port = process.env.PORT || 3001

const assertDatabaseConnectionOk = async () => {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();

        console.log('Database connected');
    } catch (error: unknown) {
        console.log('Unable to connect to the database:');
        console.error(error)
        process.exit(1);
    }
}

const syncDataBase = async () => {
    try {
        await sequelize.sync({force: false})

        console.log('Tables synced')
    } catch (err) {
        console.error('Syncing tables failed')
        console.error(err)
    }
}

const init = async () => {
    await assertDatabaseConnectionOk()
    await syncDataBase()

    console.log(`Starting Sequelize + Express on port ${port}`);

    swaggerDocs(app)
}

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
    await init()
    return serverlessExpress({app})
}
