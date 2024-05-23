import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, Equals, Matches } from "class-validator";
export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5, {
        message: 'Title is too short',
    })
    @MaxLength(10, {
        message: 'Title is too long',
    })
    login: string;

    @IsString()
    @IsEmail({},{
        message:'not correct'
    })
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, {
        message: 'Password is too short',
    })
    @MaxLength(15, {
        message: 'Password is too long',
    })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/, {
        message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
    })
    password: string;
    @IsString()
    // @Equals('password', { message: 'Passwords do not match' })
    confirmPassword: string;
}