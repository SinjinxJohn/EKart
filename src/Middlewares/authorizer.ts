import { Request,Response,NextFunction } from "express";
import { CustomRequest } from "./authHelper";



export const checkForSeller = (req:CustomRequest,res:Response,next:NextFunction)=>{
    const userRole = req.user?.roles;

    if(!userRole){
        res.status(403).json({
            messageType:"error",
            message:"Access Denied. No Role Found"
        })
    }else{
        const hasRole = userRole.includes("Seller");
        if(!hasRole){
            res.status(403).json({
                messageType:"error",
                message:"Restricted role for sellers only"
            })
        }else{
            next();
        }
    }
}

//checks for both seller and admin and allows only users
export const checkAdmin = (req:CustomRequest,res:Response,next:NextFunction)=>{
    const userRole = req.user?.roles;

    if(!userRole){
        res.status(403).json({
            messageType:"error",
            message:"Access Denied. No Role Found"
        })
    }else{
        const hasRole = userRole.includes("Admin")|| userRole.includes("Seller");
        if(hasRole){
            res.status(403).json({
                messageType:"error",
                message:"Restricted role for admin and sellers"
            })
        }else{
            next();
        }
    }
}

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