import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MobileModule } from './mobile/mobile.module';
import { ConfigModule } from '@nestjs/config';

const { MONGO_URL } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGO_URL), MobileModule
  ],
})
export class AppModule {}
