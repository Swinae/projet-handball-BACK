import { UserRoleEnum } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class SignUpAuthDto {
    @IsEmail()
    @IsNotEmpty({message: "Veuillez rentrer une adresse mail"})
    email: string;

    @IsNotEmpty()
    @MinLength(8, {message: "Le mot de passe doit contenir 8 caratères minimum"})
    password: string;

    @IsOptional()
    role?: UserRoleEnum;
}
