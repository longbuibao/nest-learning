import { Injectable } from '@nestjs/common'
import { PowerService } from 'src/power/power.service'

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}
  getData() {
    console.log('20 watts to powerservice')
    this.powerService.supplyPower(20)
    return 'data !!!'
  }
}
