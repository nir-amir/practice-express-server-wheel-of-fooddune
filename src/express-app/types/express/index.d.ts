import {User} from "../User";
import {JwtPayload} from "jsonwebtoken";

declare module 'express' {
    interface Request {
        user?: string | User | JwtPayload
    }
}