import { Request, Response } from 'express';
import { userModel } from '../Models/userModel';




export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, confirmPassword, username, roles, address } = req.body;

        // Validate input
        if (!email || !password || !username || !confirmPassword) {
            res.status(400).json({
                message: "Email/Password/Username is required",
            });
        } else {
            // Check if user exists with same email and/or same username
            const user = await userModel.findOne({ email });
            const usern = await userModel.findOne({ username });
            if (user || usern) {
                res.status(400).json({
                    messageType: "error",
                    message: "User already exists",
                });
            } else {
                // Check if address is required based on roles
                if (roles.includes("user") || roles.includes("Seller")) {
                    if (!address) {
                        res.status(400).json({
                            messageType: "error",
                            message: "Address required",
                        });
                    } else {
                        // Create user with address
                        const newUser = await userModel.create({
                            email,
                            password,
                            confirmPassword,
                            username,
                            roles,
                            address,
                        });

                        if (newUser) {
                            res.status(201).json({
                                messageType: "success",
                                message: newUser,
                            });
                        }
                    }
                } else {
                    // Create user without address
                    const newUser = await userModel.create({
                        email,
                        password,
                        confirmPassword,
                        username,
                        roles,
                    });

                    if (newUser) {
                        res.status(201).json({
                            messageType: "success",
                            message: newUser,
                        });
                    }
                }
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            // Handle specific Mongoose validation errors
            if (error.name === 'ValidationError') {
                const emailError = 'Invalid email format';
                res.status(400).json({
                    messageType: "error",
                    message: emailError,
                });
            } else {
                res.status(500).json({
                    messageType: "error",
                    message: error.message || "Internal Server Error",
                });
            }
        }
    }
};



export const getUser = async (req:Request,res:Response)=>{
    try {
        const {email} = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            res.status(404).json({
                messageType:"error",
                message:"No user found"
            })
        }else{
            res.status(200).json({
                messageType:"success",
                message:user
            })
        }
        

        
    } catch (error) {
        res.status(500).json({
            message: error || "Internal Server Error",
        });
    }
}



export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                messageType: "success",
                message: "Email or Password is required"
            })
        } else {
            const token = await userModel.matchPassword(email, password);
            res.status(200).json({
                messageType: "success",
                message: "Sign in successful", token: token
            });
        }

    } catch (error) {
        res.status(401).json({
            messageType: "error",
            message: "Sign in failed"
        })
    }
}

export const logout = async (req: Request, res: Response) => {
    res.json({
        messageType: "success",
        message: "Logged out successfully"
    })

}
