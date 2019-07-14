import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class RegisterUserDTO {
  @IsNotEmpty()
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly password: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly role: string;
}
