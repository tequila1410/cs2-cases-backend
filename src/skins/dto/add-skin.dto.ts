import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export enum Rarity {
  ConsumerGrade = 'Consumer Grade',
  IndustrialGrade = 'Industrial Grade',
  MilSpec = 'Mil-Spec',
  Restricted = 'Restricted',
  Classified = 'Classified',
  Covert = 'Covert',
  Extraordinary = 'Extraordinary',
  Contraband = 'Contraband',
}

export class AddSkinDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly weaponName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly skinName: string;

  @IsOptional()
  readonly description: string

  @IsNotEmpty()
  @IsEnum(Rarity)
  readonly rarity: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  readonly price: number;

  readonly image: any;
}