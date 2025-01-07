import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { Skin } from "./schemas/skin.schema";
import { AddSkinDto } from "./dto/add-skin.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SkinsService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Skin.name) private skinModel: Model<Skin>
  ) {}

  async create(createSkinDto: AddSkinDto, imageUrl: string): Promise<Skin> {
    const newSkin = new this.skinModel({ ...createSkinDto, imageUrl });
    try {
      return await newSkin.save();
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException('This skin already exists with the same weapon and skin name.');
      throw error;
    }
  }

  async findAll(): Promise<Skin[]> {
    const skins = await this.skinModel.find().exec();
    const baseUrl = this.configService.get('BASE_URL');

    return skins.map(skin => ({
      ...skin.toObject(),
      imageUrl: `${baseUrl}${skin.imageUrl}`
    })) as Skin[];
  }

  async getSkinById(id: string): Promise<Skin | null> {
    try {
      const skin = await this.skinModel.findById(id).lean().exec();
      return skin ? { ...skin, imageUrl: `${process.env.BASE_URL}${skin.imageUrl}` } : null;
    } catch (error) {
      throw new NotFoundException(`Skin with ID ${id} not found`);
    }
  }
}