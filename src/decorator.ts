import { Inject } from '@nestjs/common'

export const InjectModel = function (DecoratorOrName: (new () => any) | string) {
  if (typeof DecoratorOrName === 'string') {
    return Inject(`MODEL_${DecoratorOrName}`)
  } else {
    return Inject(`MODEL_${DecoratorOrName.name}`)
  }
}

export const InjectMethod = function (DecoratorOrName: (new () => any) | string) {
  if (typeof DecoratorOrName === 'string') {
    return Inject(`METHOD_${DecoratorOrName}`)
  } else {
    return Inject(`METHOD_${DecoratorOrName.name}`)
  }
}
