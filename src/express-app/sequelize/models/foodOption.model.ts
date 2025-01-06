import {FoodOptionInstance} from "../../types/FoodOption";
import {DataTypes, Sequelize} from "sequelize";

module.exports = (sequelize: Sequelize) => {
    sequelize.define<FoodOptionInstance>('FoodOption', {
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
        // HH:MM format
        opens_at: {
            allowNull: false,
            type: DataTypes.STRING
        },
        // HH:MM format
        closes_at: {
            allowNull: false,
            type: DataTypes.STRING
        },
        kitchen_style: {
            allowNull: false,
            type: DataTypes.STRING
        },
    })
}