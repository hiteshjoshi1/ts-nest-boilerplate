import { ApiModelProperty } from '@nestjs/swagger';
export class RegisterUserDTO {
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly password: string;
  @ApiModelProperty()
  readonly role: string;
}
