import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { SkinSchema } from "./schemas/skin.schema";
import { SkinsService } from "./skins.service";
import { SkinsController } from "./skin.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Skin', schema: SkinSchema}])
  ],
  providers: [SkinsService],
  controllers: [SkinsController]
})
export class SkinsModule {}
