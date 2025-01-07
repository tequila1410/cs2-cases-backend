import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class GetSkinDto {

  @IsMongoId()
  readonly id: string;
}