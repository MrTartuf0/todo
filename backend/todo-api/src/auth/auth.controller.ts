import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from 'src/jwt/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}

    /**
     * 
     * @param authPayload 
     * @returns 
     */
    @Post('createUser')
    @UsePipes(new ValidationPipe())
    createUser(@Body() authPayload: AuthPayloadDTO){
        return this.authService.createUser(authPayload)
    }

    /**
     * 
     * @param authPayload 
     * @returns 
     */
      @Post('getJwt')
      @UsePipes(new ValidationPipe())
      getJwt(@Body() authPayload: AuthPayloadDTO){
        return this.authService.getJwt(authPayload)
      }

      /**
       * 
       * @param req 
       * @returns 
       */
      @Get('test')
      @UseGuards(JwtGuard)
      test(@Req() req:Request){
        return "hello!"
      }
}
