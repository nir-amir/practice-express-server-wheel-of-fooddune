import {Sequelize} from "sequelize";
import * as mysql2 from 'mysql2'
import 'dotenv/config'

export const sequelize = new Sequelize({
    dialect: 'mysql',
    dialectModule: mysql2,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE
})

const modelDefiners = [
    require('./models/foodOption.model'),
    require('./models/user.model')
]

for (const modelDefiner of modelDefiners) {
    try{
        modelDefiner(sequelize)
    } catch (err) {
        console.error(err)
    }
}

export const models = sequelize.models
