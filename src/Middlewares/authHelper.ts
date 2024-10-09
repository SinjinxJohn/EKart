import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "Models/userModel"; // Adjust path based on your baseUrl
import { validateToken } from "Services/auth";


// import { Request } from "express";
export interface CustomRequest extends Request {
    token: string | JwtPayload;
   }

export const checkForToken = () => {
    return (req: Request, res: Response, next: NextFunction) => {
      try{
        const token = req.header('Authorization')?.replace('Bearer','');
        if(!token){
            throw new Error();
        }

        const decoded = validateToken(token);
        (req as CustomRequest).token = decoded;
        next();
        
      }catch(error){
        console.error("Token validation error",error);
        res.status(401);
        return next();
      }
    };
  };


  
  
