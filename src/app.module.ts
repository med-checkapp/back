import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const { MONGO_URL } = process.env;

@Module({
  imports: [MongooseModule.forRoot(MONGO_URL)],
})
export class AppModule {}
