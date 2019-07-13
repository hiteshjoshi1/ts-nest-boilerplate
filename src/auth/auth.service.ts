import { Injectable } from '@nestjs/common';
import { Payload } from '../dto/jwt-payload';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async generateJWT(payload: Payload) {
    return this.jwtService.sign(payload, { expiresIn: '12h' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findUserbyJWT(payload);
  }
}
