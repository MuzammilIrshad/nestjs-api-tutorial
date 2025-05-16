import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2"
import { AuthDto } from "./dto";

@Injectable()
export class AuthService{
    constructor(private prisma:PrismaService){

    }
    login(){
        return {message:"login success"}
    }
   async signup(dto:AuthDto){
        //generate the password hash
        const hash = await argon.hash(dto.password.toString())

        try{
            //save the user in db
        const user = await this.prisma.user.create({
            data:{
                email:dto.email.toString(),
                hash:hash
            },
            select:{
                id:true,
                email:true
            },
            
        })

         //return the saved user
        return user
        }catch(error){
            if(error.code === "P2002"){
                throw new ForbiddenException("Credentials are taken")
            }
        }
       
    }
}