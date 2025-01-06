import bcrypt from "bcryptjs";

export const hashString = (pw: string) => {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(pw, salt)
}