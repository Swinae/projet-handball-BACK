import { UserRoleEnum } from "@prisma/client"

export interface IRequestWithUser extends Request {
        user : {
            sub: number,
            role: UserRoleEnum
        }
        refreshToken: string
}
