import {
  IsNotEmpty,
  IsString
} from "class-validator";
import { CaseExists } from "../dto-validators/case-exist.validator";

export class GetCaseDto {

  @IsNotEmpty()
  @IsString()
  @CaseExists({message: 'Case with the given ID does not exist'})
  readonly caseId: string;
}