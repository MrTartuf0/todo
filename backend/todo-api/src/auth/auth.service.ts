import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginPayloadDTO } from './dto/jwt.dto';
import validator from 'validator';
import { UserToDo } from 'src/schemas/todo.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserToDo.name) private userToDo: Model<UserToDo>,
        private jwtService: JwtService) { }

    /**
     * 
     * @param authPayloadDto 
     * @returns 
     */
    async createUser(authPayloadDto: AuthPayloadDTO): Promise<User> {
        const { username, email, password } = authPayloadDto;

        const existingUser = await this.userModel.findOne({ $or: [{ username }, { email }] }).exec();
        if (existingUser) {
            throw new HttpException("User already exists!", 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const newUser = new this.userModel({ username, email, password: hashedPassword });

        return newUser.save();
    }

    /** 
     * 
     * @param authPayloadDto 
     * @returns 
     */
    async login(loginPayload: LoginPayloadDTO): Promise<string> {
        const { identifier, password } = loginPayload;

        const isEmail = validator.isEmail(identifier);

        const user = await this.userModel.findOne(
            isEmail ? { email: identifier } : { username: identifier }
        ).exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.username, sub: user._id };
        const token = this.jwtService.sign(payload);

        return token;
    }

    async getTodo(decodedToken: any): Promise<UserToDo> {
        const username = decodedToken.username;
        console.log("username =", username);

        if (!username) {
            throw new NotFoundException('User not found');
        }

        const todoList = await this.userToDo.findOne({ username }).exec();
        console.log("todoList", todoList);

        if (!todoList) {
            throw new NotFoundException('ToDo list not found for the user');
        }

        return todoList;
    }



}
