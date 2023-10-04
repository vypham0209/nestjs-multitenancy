import { Prop, Schema } from '@nestjs/mongoose'
@Schema()
export class Test {
  @Prop({ type: String })
  name: string

}
