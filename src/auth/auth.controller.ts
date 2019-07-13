import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginUserDTO } from '../dto/login-user.dto';
import { RegisterUserDTO } from '../dto/register-user.dto';
import { Payload } from '../dto/jwt-payload';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() userDTO: LoginUserDTO) {
    let { email, password } = userDTO;
    const user = await this.userService.validateLogin(email, password);
    const payload: Payload = {
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const token = await this.authService.generateJWT(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterUserDTO) {
    const user = await this.userService.create(userDTO);
    const payload: Payload = {
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const token = await this.authService.generateJWT(payload);
    return { user, token };
  }
}
