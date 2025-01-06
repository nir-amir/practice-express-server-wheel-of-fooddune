import {Model} from "sequelize";

interface FoodOptionAttributes {
    id: string,
    name: string,
    opens_at: string,
    closes_at: string,
    kitchen_style: string,
}

interface FoodOptionCreationAttributes
    extends Optional<FoodOptionAttributes, 'id'> {}

export interface FoodOptionInstance
    extends Model<FoodOptionAttributes, FoodOptionCreationAttributes>,
        FoodOptionAttributes {
    createdAt?: Date
    updatedAt?: Date
}
