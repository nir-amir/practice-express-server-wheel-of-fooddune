import {hashString} from "./util/hashString";
import {sequelize} from "./sequelize/db-service";

export const setupExampleData = async () => {
    await sequelize.sync({force: true})

    await sequelize.models.FoodOption.bulkCreate([
        {name: 'Hafenmarkt', opens_at: '07:00', closes_at: '21:00', kitchen_style: 'Random'},
        {name: 'Mero Bhudda', opens_at: '11:00', closes_at: '22:30', kitchen_style: 'Random'},
        {name: 'Falafel Point', opens_at: '11:00', closes_at: '21:00', kitchen_style: 'Random'},
        {name: 'Pierhouse', opens_at: '11:00', closes_at: '13:00', kitchen_style: 'Random'},
        {name: 'Hafendöner', opens_at: '10:30', closes_at: '13:00', kitchen_style: 'Random'},
        {name: 'Umami', opens_at: '12:00', closes_at: '21:30', kitchen_style: 'Random'},
        {name: 'Vapiano', opens_at: '12:00', closes_at: '10:00', kitchen_style: 'Random'},
        {name: 'Gustav Grün', opens_at: '11:30', closes_at: '22:00', kitchen_style: 'Random'},
    ])

    await sequelize.models.User.bulkCreate([
        {name: 'root', password: hashString('Test2222')}
    ])
}

setupExampleData()






