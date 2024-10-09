export interface User{
    username:string,
    email:string,
    password:string,
    roles:string[],
    confirmPassword:string,
    createdAt?: Date,
    updatedAt?:Date,
}