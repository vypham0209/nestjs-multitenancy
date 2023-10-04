import { DynamicModule, Module } from '@nestjs/common'
import { REQUEST, } from '@nestjs/core'
import { MongooseModule, SchemaFactory, getConnectionToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Request } from 'express'
import { Connection, FilterQuery, Model, Schema } from 'mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
const factoryMethod = function <D = any>(Model: Model<D>) {
  return {
    findAll: (query: FilterQuery<D>) => Model.find(query)
  }
}

export type Method<D = any> = ReturnType<typeof factoryMethod<D>>

@Module({})
class ModelModule {
  static register<D = any>(Decorator: new () => D, collectionName: string = undefined, hook?: (schema: Schema<D>) => void): DynamicModule {
    const Schema = SchemaFactory.createForClass(Decorator)
    if (hook) {
      hook(Schema)
    }

    const providers = [
      {
        provide: `MODEL_${collectionName || Decorator.name}`,
        useFactory(connection: Connection, req: Request) {
          return connection
            .useDb(req.query.tenant as string)
            .model(collectionName || Decorator.name, Schema)
        },
        inject: [getConnectionToken(), REQUEST],
      },
      {
        provide: `METHOD_${collectionName || Decorator.name}`,
        useFactory: factoryMethod,
        inject: [`MODEL_${collectionName || Decorator.name}`],
      }
    ]
    return {
      module: ModelModule,
      providers: providers,
      exports: providers,
    }
  }

}

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', { maxPoolSize: 100 }),
    ModelModule.register(Test)
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
