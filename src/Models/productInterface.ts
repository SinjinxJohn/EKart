export interface Product{
    productName:string,
    productPrice:number,
    productDetails:{
        brand:string,
        colour:string,
        material:string,
    },
    address:string
    productImage:string,
    reviews:Review[],
    purchased:number,
    stock:number,
    tags?:string[],
    createdAt:Date,
    updatedAt?:Date
}

export interface UserProduct{
    userId:string,
    productId:string,
    favourite:boolean,
    purchased:boolean
}




export interface Review{
    id:string
    reviewer:string,
    rating:number,
    comment:string,
    date:Date
}