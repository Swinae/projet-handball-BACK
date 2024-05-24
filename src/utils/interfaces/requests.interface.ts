import { UserRoleEnum } from "@prisma/client"

export interface RequestWithUser extends Request {
        user : {
            sub: number,
            role: UserRoleEnum
        }
        refreshToken: string
}
