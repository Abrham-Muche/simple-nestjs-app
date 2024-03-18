import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  userid: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  status?: number;

  @ApiProperty()
  userPictureUrl?: string;

  @ApiProperty()
  email: string;
}
