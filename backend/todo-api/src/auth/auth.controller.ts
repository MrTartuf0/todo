import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}

    @Post('createUser')
    @UsePipes(new ValidationPipe())
    createUser(@Body() authPayload: AuthPayloadDTO){
        console.log(authPayload )
        return this.authService.createUser(authPayload)
    }

      @Post('getJwt')
      @UsePipes(new ValidationPipe())
      getJwt(@Body() authPayload: AuthPayloadDTO){
        return this.authService.getJwt(authPayload)
      }
}
