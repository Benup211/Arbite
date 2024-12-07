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
    static async AddRestaurant(name:string,phone_no:string,menu_image:string,location:string){
        return await prisma.restaurant.create({
            data:{
                name,
                phone_no,
                menu_image,
                location
            }
        });
    }
    static async findAllRestaurants(){
        return await prisma.restaurant.findMany(
            {
                select:{
                    restaurant_id:true,
                    name:true,
                    phone_no:true,
                    location:true,
                    menu_image:true
                }
            }
        );
    }
}