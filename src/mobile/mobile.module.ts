import { Module } from '@nestjs/common';
import { MobileController } from './mobile.controller';

@Module({
  controllers: [MobileController]
})
export class MobileModule {}
