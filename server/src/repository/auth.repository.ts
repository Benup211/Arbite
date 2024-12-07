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
    static async getAllOngoingOrders(){
        return await prisma.order.findMany({
            select:{
                order_id:true,
                timestamp:true,
                restaurant:{
                    select:{
                        name:true,
                    }
                },
                ordered_by_user:{
                    select:{
                        user_id:true,
                        username:true
                    }
                }
            },
            where:{
                status:"ongoing"
            }
        })
    }
    static async getAllCompletedOrders(){
        return await prisma.order.findMany({
            select:{
                order_id:true,
                timestamp:true,
                restaurant:{
                    select:{
                        name:true,
                    }
                },
                ordered_by_user:{
                    select:{
                        user_id:true,
                        username:true
                    }
                }
            },
            where:{
                status:"completed"
            }
        })
    }
    static async getLunchOrders(order_id:number){
        return await prisma.lunchOrder.findMany({
            select:{
                lunchOrder:true,
                tea:true,
                user:{
                    select:{
                        username:true
                    }
                }
            },
            where:{
                order_id
            }
        })
    }
    static async createLunchOrder(order_id:number,tea:boolean,lunchOrder:string,user_id:number){
        return await prisma.lunchOrder.create({
            data:{
                order_id,
                lunchOrder,
                user_id,
                tea
            }
        })
    }
    static async createOrder(ordered_by_user_id:number,restaurant_id:number){
        return await prisma.order.create({
            data:{
                ordered_by_user_id,
                restaurant_id
            }
        })
    }
    static async completeOrder(order_id:number){
        return await prisma.order.update({
            where:{
                order_id
            },
            data:{
                status:"completed"
            }
        })
    }
    static async getAllRestaurant(){
        return await prisma.restaurant.findMany({
            select:{
                restaurant_id:true,
                name:true,
            }
        })
    }

}