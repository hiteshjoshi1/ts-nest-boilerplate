import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
export class LoginUserDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly password: string;
}
