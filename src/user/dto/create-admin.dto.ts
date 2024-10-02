import { UserRoleEnum } from "@prisma/client";
import { CreateUserDto } from "./create-user.dto";

export class CreateAdmin extends CreateUserDto {
  role : UserRoleEnum
}