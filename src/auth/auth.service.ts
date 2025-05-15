import { Injectable } from "@nestjs/common";


@Injectable()
export class AuthService{
    login(){
        return {message:"login success"}
    }
    signup(){
        return {message:"Sign up success"}
    }
}