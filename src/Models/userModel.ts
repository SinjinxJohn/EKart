import mongoose, { Schema,model, Document, Model } from "mongoose";
import { User } from "./userInterface";
import bcrypt from "bcrypt"
import {createTokenForUser} from "../Services/auth";



// export interface User{
//     username:string,
//     email:string,
//     password:string,
//     salt:string,
//     confirmPassword:string,
//     createdAt?: Date,
//     updatedAt?:Date,
// }
export interface UserModel extends User,Document{}

const UserSchema:Schema<UserModel> = new Schema({
    username:{type:String, required:true,unique:true},
    email:{type:String, required:true,unique:true,match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/},
    password:{type:String,min:8,required:true},
    roles:{type:[String], enum: ["user", "Admin", "Seller"],default:["user"]},
    address:{type:String},
    confirmPassword:{type:String,required:true, min:8}
})

UserSchema.pre<UserModel>('save',async function(next){
    const user = this;
    if(!user.isModified("password")) return next();
    if(this.password != this.confirmPassword){
        return next(Error("Passwords do not match"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(user.password,salt);
    user.password = hashedpassword;
    user.confirmPassword = "";
    next();
})

interface UserModelStatic extends Model<UserModel>{
    matchPassword(email:string,password:string):Promise<string>;
}

UserSchema.static("matchPassword",async function(email:string,password:string): Promise<string>{
    const user = await this.findOne({email});
    if(!user){
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password is incorrect");
    }

    const token = createTokenForUser(user);
    return token;
})

export const userModel = model<UserModel,UserModelStatic>('UserModel',UserSchema);
