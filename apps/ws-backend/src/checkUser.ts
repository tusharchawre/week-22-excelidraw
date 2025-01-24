import jwt from "jsonwebtoken"
import "dotenv/config"

export const  checkUser = (token: string) : string | null => {

    const decoded = jwt.verify(token , process.env.JWT_SECRET! || "123123") as {userId :string}

    if(decoded){
        return decoded.userId
    }
    else {
        return null
    }

    return null
}