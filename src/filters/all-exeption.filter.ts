import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
// import { DatabaseException } from "../exceptions/database.exception";

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()
        response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: 'unknown exception'
            });
    }
}