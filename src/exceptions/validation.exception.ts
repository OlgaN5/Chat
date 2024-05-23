import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidationException extends HttpException {
    constructor(message: string, error: {}) {
        super(message, HttpStatus.BAD_REQUEST, error)
    }
}