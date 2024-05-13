import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class DatabaseService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    createUser() {
        
    }
}
