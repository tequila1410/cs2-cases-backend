import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface Skin {
  weaponName: string;
  skinName: string;
  description: string;
  price: number;
  rarity: string;
  imageUrl: string; // Добавляем поле imageUrl
}

export interface SkinDocument extends Document, Skin {}

@Schema()
export class Case extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({required: true})
  imageUrl: string;

  @Prop()
  price: number;

  @Prop({default: false})
  isDashboardVisible: boolean;

  @Prop([
    {
      skin: { type: Types.ObjectId, ref: 'Skin', required: true },
      dropRate: { type: Number, required: true, min: 0, max: 100 },
    },
  ])
  skins: { skin: Skin; dropRate: number }[];
}

export const CaseSchema = SchemaFactory.createForClass(Case);