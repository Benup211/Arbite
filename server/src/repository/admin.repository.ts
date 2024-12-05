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
    static async findAdminById(admin_id:number){
        return await prisma.admin.findUnique({
            where:{
                admin_id
            }
        })
    }
    static async findAllUsers(){
        return await prisma.user.findMany(
            {
                select:{
                    user_id:true,
                    username:true,
                    phone_no:true
                }
            }
        );
    }
}