import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "Models/userInterface";
import { UserModel } from "Models/userModel";

export const secret = process.env.secret||"betty-bought-some-butter-but-the-butter-was-bitter";
export function createTokenForUser(user:UserModel): string{
    const payload = {
        _id:user.id,
        username:user.username,
        roles:user.roles,
    }

    const token:string = jwt.sign(payload,secret,{expiresIn:'10m'}); 
    return token;
}

export function validateToken(token:string){
    const payload = jwt.verify(token,secret) as JwtPayload;
    // console.log(payload);
    return payload;
}





