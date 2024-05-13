import { Body, Controller, Post } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    @Post('login')
    login(@Body() authPayload: AuthPayloadDTO){
        
    }
}
