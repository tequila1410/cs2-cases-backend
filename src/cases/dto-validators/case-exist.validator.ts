import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import { CasesService } from "../cases.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class CaseExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly casesService: CasesService) {}

  async validate(caseId: string, args: ValidationArguments): Promise<boolean> {
    const caseExists = await this.casesService.findById(caseId);
    return !!caseExists;
  }

  defaultMessage(args: ValidationArguments): string {
    return `Case with ID "${args.value}" does not exist`;
  }
}

export function CaseExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: CaseExistsConstraint,
    });
  };
}