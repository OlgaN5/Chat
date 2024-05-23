import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { DatabaseException } from "../exceptions/database.exception";

@Catch(DatabaseException)
export class DatabaseExceptionFilter extends BaseExceptionFilter {
    catch(exception: DatabaseException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()
        response
            .status(500)
            .json({
                statusCode: 500,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: exception.message
            });
    }
}