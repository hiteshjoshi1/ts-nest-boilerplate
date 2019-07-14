import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { compare } from 'bcrypt';
import { RegisterUserDTO } from '../dto/register-user.dto';
import { Payload } from '../dto/jwt-payload';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findUserbyJWT(payload: Payload): Promise<User> {
    const { email } = payload;
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }
  async validateLogin(email: string, password: string): Promise<User> {
    let user: User = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException('No user found with Email');
    }

    if (await compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(registerUserDTO: RegisterUserDTO): Promise<User> {
    let user = await this.findByEmail(registerUserDTO.email);

    if (user) {
      throw new BadRequestException('User already exists with this email');
    } else {
      let user: User = new User();
      user.name = registerUserDTO.name;
      user.email = registerUserDTO.email;
      user.password = registerUserDTO.password;
      user.role = registerUserDTO.role;
      let savedUser: User = await this.userRepository.save(user);
      return this.sanitizeUser(savedUser);
    }
  }

  private sanitizeUser(user: User) {
    const sanitized = user;
    delete sanitized['password'];
    delete sanitized['id'];
    return sanitized;
  }
}
