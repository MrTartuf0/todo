import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) { }

    async createUser(authPayloadDto: AuthPayloadDTO): Promise<User> {
        const { username, email, password } = authPayloadDto;

        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const newUser = new this.userModel({ username, email, password: hashedPassword });

        // Save the new user to the database
        return newUser.save();
    }

    async getJwt(authPayloadDto: AuthPayloadDTO): Promise<string> {
        const { username, email, password } = authPayloadDto;

        const user = await this.userModel.findOne({ $or: [{ username }, { email }] }).exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        console.log("Password", password)
        console.log(isPasswordValid, " - ", user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.username, sub: user._id };
        const token = this.jwtService.sign(payload);

        return token;
    }

    
}
