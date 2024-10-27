import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "Models/userInterface";
import { userModel, UserModel } from "Models/userModel"; // Adjust path based on your baseUrl
import { validateToken } from "../Services/auth";


// import { Request } from "express";

export interface UserPayload{
  id:string,
  username:string,
  roles:[string],

}
export interface CustomRequest extends Request {
    user?: UserPayload;
   }

export const checkForToken = () => {
    return (req: Request, res: Response, next: NextFunction) => {
      try{
        const token = req.header('Authorization')?.replace('Bearer','').trim();
        if(!token){
            // throw new Error();
            console.log("No token found");
        }else{
          const decoded = validateToken(token);
        (req as CustomRequest).user = {
          id:decoded._id,
          username:decoded.username,
          roles:decoded.roles
        };
        // console.log("token found "+ token);
        }

        
        // console.log(decoded.roles);
      
        
        next();
        
      }catch(error){
        console.error("Token validation error",error);
        res.status(401);
        return next();
      }
    };
  };

