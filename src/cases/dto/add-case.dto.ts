import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber, IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";

class SkinChanceDto {
  @IsNotEmpty()
  @IsString()
  skin: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  dropRate: number;
}

export class AddCaseDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly name: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  readonly price: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly isDashboardVisible: boolean;

  readonly image: any;

  @IsArray()
  skins: Array<{ skinId: string; dropRate: number }>;
}