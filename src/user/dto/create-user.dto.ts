import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: "Veuillez rentrer une adresse mail" })
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: "Le mot de passe doit contenir 8 caratères minimum" })
  password: string;
}
