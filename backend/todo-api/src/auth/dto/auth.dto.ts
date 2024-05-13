import { IsEmail, IsNotEmpty, IsString } from "class-validator"


export class AuthPayloadDTO {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    password: string

}