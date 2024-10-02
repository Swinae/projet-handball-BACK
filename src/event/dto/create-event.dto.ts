import { EventTypeEnum } from "@prisma/client"
import { IsDate, IsNotEmpty, IsOptional } from "class-validator"

export class CreateEventDto {

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    adress: string

    @IsNotEmpty()
    type: EventTypeEnum

    @IsOptional()
    img?: string

    @IsNotEmpty()
    @IsDate()
    start_time: Date

    @IsNotEmpty()
    @IsDate()
    end_time: Date

    creator_id: number

    @IsOptional()
    match_id: number

}
