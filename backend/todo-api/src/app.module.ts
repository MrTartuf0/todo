import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config'
import { AuthMiddleware } from './auth/auth.middleware';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_STRING),
    AuthModule,
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'auth/test', method: RequestMethod.GET });
  }
}
