import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "Models/userInterface";
import { UserModel } from "Models/userModel";

export const secret = process.env.secret||"hot";
export function createTokenForUser(user:UserModel): string{
    const payload = {
        _id:user.id,
        email:user.email,
        password:user.password,
        confirmPassword:user.confirmPassword,
    }

    const token:string = jwt.sign(payload,secret,{expiresIn:'10m'}); 
    return token;
}

export function validateToken(token:string){
    const payload = jwt.verify(token,secret);
    return payload;
}





