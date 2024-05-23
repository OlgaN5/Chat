import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value)
    const error = await validate(object)
    console.log('error')
    console.log(error)
    if (error.length > 0) {
      throw new ValidationException('Custom validation message', {cause: error })
      // BadRequestException('Custom validation message', { cause: error })
    }
    return value
  }
  private toValidate(metatype: Function) {
    const types: Function[] = [Boolean, String, Number, Array, Object]
    return types.includes(metatype)
  }
}
