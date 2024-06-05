import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_JWT
        })
    }

    /**
     * 
     * @param payload 
     * @returns 
     */
    validate(payload: any){
        console.log("Inside JWT strategy Validate")
        return payload
    }
}