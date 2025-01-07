import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Skin extends Document {
  @Prop({ required: true })
  weaponName: string;

  @Prop({ required: true })
  skinName: string;

  @Prop()
  description: string;

  @Prop({required: true})
  price: number;

  @Prop({required: true})
  rarity: string;

  @Prop()
  imageUrl: string;
}

export const SkinSchema = SchemaFactory.createForClass(Skin);

SkinSchema.index({ weaponName: 1, skinName: 1 }, { unique: true });