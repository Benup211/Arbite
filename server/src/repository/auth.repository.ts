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
}