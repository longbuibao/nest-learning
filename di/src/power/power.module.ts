import { Module } from '@nestjs/common'
import { PowerService } from './power.service'

@Module({
  //create DI container
  providers: [PowerService],
  //inside DI container, indicate that this class can be used in other class
  exports: [PowerService],
})
export class PowerModule {}
