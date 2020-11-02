import { Controller, Get } from '@nestjs/common';

@Controller('mobile')
export class MobileController {
  @Get('/frax-result')
  async calculate() {
    return { msg: "Hello, World!" };
  }
}
