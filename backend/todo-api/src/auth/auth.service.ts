import { Injectable } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    createUser(authPayloadDto: AuthPayloadDTO){
        const newUser = new this.userModel()
    }


    validateUser(authPayloadDto: AuthPayloadDTO) {

    }
}
