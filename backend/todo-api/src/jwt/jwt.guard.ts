  import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { Observable } from 'rxjs';

  @Injectable()
  export class JwtGuard extends AuthGuard('jwt') {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      console.log("Inside jwt guard !")
      return super.canActivate(context)
    }
  } 
