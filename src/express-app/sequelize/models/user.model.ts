import {UserInstance} from "../../types/User";
import {Sequelize, DataTypes} from "sequelize";

module.exports = (sequelize: Sequelize) => {
    sequelize.define<UserInstance>('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        }
    })
}