import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config'


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_STRING),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
