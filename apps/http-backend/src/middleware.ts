import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import "dotenv/config"

declare global{
    namespace Express{
        interface Request{
            userId?: string
        }
    }
}

export const middleware = (req: Request, res: Response , next : NextFunction) => {
    const token = req.headers["authorization"] ?? ""

    const decoded = jwt.verify(token , process.env.JWT_SECRET || "123123") as {userId: string}

    if(decoded){
        req.userId = decoded.userId
        next()
    }
    else{
        res.status(403).json({
            message: "Unauthorized!"
        })
    }

}