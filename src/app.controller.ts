import { Controller, Get, Query } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { AppService } from './app.service'

class GetDto {
  @ApiProperty()
  tenant: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(@Query() _: GetDto) {
    return this.appService.getHello()
  }
}
