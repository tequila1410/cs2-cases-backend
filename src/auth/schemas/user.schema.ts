import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from "class-transformer";

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ unique: [true, 'Duplicated email entered'], required: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);