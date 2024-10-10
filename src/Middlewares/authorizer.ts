import { Request,Response,NextFunction } from "express";
import { CustomRequest } from "./authHelper";



export const checkRole = (req:CustomRequest,res:Response,next:NextFunction) =>{
    const userRole = req.user?.roles;

    if(!userRole){
        // console.log(req.user);
        res.status(403).json({
            messageType:"error",
            message:"Access Denied. No Role Found"
        })
    }else{
        const hasRole = userRole.includes("Admin");
        if(!hasRole){
            res.status(403).json({
                messageType:"error",
                message:"User does not have enough permission to access this route"
            })
        }
        next();
    }
}