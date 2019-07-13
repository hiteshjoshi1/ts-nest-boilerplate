import { ApiModelProperty } from '@nestjs/swagger';
export class LoginUserDTO {
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly password: string;
}
