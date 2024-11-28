import prisma from "../models/prisma.model";

export class AuthRepository {
    static async createUser(username:string,password:string,phone_no:string){
        return await prisma.user.create({
            data:{
                username,
                password,
                phone_no
            }
        })
    }
    static async findUserByUsername(username:string){
        return await prisma.user.findUnique({
            where:{
                username
            }
        })
    }
    static async findUserById(user_id:number){
        return await prisma.user.findUnique({
            where:{
                user_id
            },
            select:{
                user_id:true,
                username:true,
                phone_no:true
            }
        })
    }
}