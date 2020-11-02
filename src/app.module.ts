import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MobileModule } from './mobile/mobile.module';

const { MONGO_URL } = process.env;

@Module({
  imports: [MongooseModule.forRoot(MONGO_URL), MobileModule],
})
export class AppModule {}
