import { IsNotEmpty, IsString } from "class-validator";

export class LoginPayloadDTO {
    // @ValidateIf(o => !o.email)
    // @IsNotEmpty()
    // @IsString()
    // username?: string;

    @IsNotEmpty()
    @IsString()
    identifier: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}