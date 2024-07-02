import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { LoginPayloadDTO } from './dto/jwt.dto';
import { Request } from 'express';

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
     * @param loginPayload 
     * @returns 
     */
      @Post('login')
      @UsePipes(new ValidationPipe())
      getJwt(@Body() loginPayload: LoginPayloadDTO){
        return this.authService.login(loginPayload)
      }

      /**
       * 
       * @param req 
       * @returns 
       */
      @Get('todos')
      @UseGuards(JwtGuard)
      test(@Req() req:Request){
        return this.authService.getTodo(req.user)
      }
}
