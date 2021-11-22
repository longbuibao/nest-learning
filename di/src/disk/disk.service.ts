import { Injectable } from '@nestjs/common'
import { PowerService } from 'src/power/power.service'

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}

  getData() {
    console.log('Powering 10 watts for disk ')
    this.powerService.supplyPower(20)
    return 'Data'
  }
}
