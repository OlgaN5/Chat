import { ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { ValidationException } from "../exceptions/validation.exception";
import { Request, Response } from "express";


// type ValidationExceptionType = ValidationException & {
//     options: {}; // Дополнительное свойство вашего типа
//   };
export class ValidationExceptionFilter extends BaseExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: exception.message,
                cause: exception.cause
            })
            .send();
    }
}