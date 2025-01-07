import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  NotFoundException,
  BadRequestException
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { extname } from 'path';

import { SkinsService } from './skins.service';
import { AddSkinDto } from "./dto/add-skin.dto";
import { GetSkinDto } from "./dto/get-skin.dto";

@Controller('skins')
export class SkinsController {
  constructor(private readonly skinsService: SkinsService) {}

  @Post('/add')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/skins',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
          return callback(new BadRequestException('Invalid file format'), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Body() createSkinDto: AddSkinDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Image is required');
    }
    const imageUrl = `/uploads/skins/${file.filename}`;
    return this.skinsService.create(createSkinDto, imageUrl);
  }

  @Get('/getAll')
  async findAll() {
    return this.skinsService.findAll();
  }

  @Get('/getSkin')
  async getSkinById(@Body() param: GetSkinDto) {
    const skin = await this.skinsService.getSkinById(param.id);
    if (!skin) {
      throw new NotFoundException(`Skin with ID ${param.id} not found`);
    }
    return skin;
  }
}