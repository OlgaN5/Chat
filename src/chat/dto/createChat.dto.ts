import { ApiProperty } from "@nestjs/swagger"

export class CreateChatDto {
    @ApiProperty()
    otherUsersId: number[]
}