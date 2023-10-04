import { Injectable } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Method } from './app.module'
import { InjectMethod } from './decorator'
interface IService {
  method?: Method
  [k: string]: any
}
@Injectable()
export class AppService implements IService {
  @InjectMethod(Test) method: Method<Test>

  getHello() {
    return this.method.findAll({})
  }
}
