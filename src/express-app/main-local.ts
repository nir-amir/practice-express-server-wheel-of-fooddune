import swaggerDocs from "./swagger";
import app from './express/app'
import {sequelize} from "./sequelize/db-service";
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
    await sequelize.sync({force: false})
        .then(() => console.log('Tables synced'))
        .catch((error: unknown) => {
            console.error('Syncing tables failed')
        })
}

const init = async () => {
    await assertDatabaseConnectionOk()
    await syncDataBase()

    console.log(`Starting Sequelize + Express on port ${port}`);

    swaggerDocs(app)

    app.listen(port, () => {
        console.log(`Express server started on port ${port}`)
    })
}

init()