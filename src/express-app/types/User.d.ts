import {Model} from "sequelize";

interface UserAttributes {
    id: string,
    name: string,
    password
}

interface UserCreationAttributes
    extends Optional<UserAttributes, 'id'> {}

export interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
        UserAttributes {
            createdAt?: Date
            updatedAt?: Date
}