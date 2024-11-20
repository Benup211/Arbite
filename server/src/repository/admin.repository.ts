import prisma from "../models/prisma.model";

export class AdminRepository {
    static async createAdmin(username:string,password:string){
        return await prisma.admin.create({
            data:{
                username,
                password
            }
        })
    }
    static async findAdminByUsername(username:string){
        return await prisma.admin.findUnique({
            where:{
                username
            }
        })
    }
}