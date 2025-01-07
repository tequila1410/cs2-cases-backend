import { Module } from '@nestjs/common';
import { CasesController } from "./cases.controller";
import { CasesService } from "./cases.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CaseSchema } from "./schemas/case.schema";
import { CaseExistsConstraint } from "./dto-validators/case-exist.validator";

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Case', schema: CaseSchema}])
  ],
  controllers: [CasesController],
  providers: [CasesService, CaseExistsConstraint],
  exports: [CasesService]
})
export class CasesModule {}
