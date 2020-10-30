import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '../config/config.module';
import {ConfigService} from '../config/config.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';


// @Module({
//   imports: [JwtModule.register({ secret: process.env.SECRET_KEY }), UserModule, ConfigModule],
//   providers: [AuthService, JwtStrategy],
//   controllers: [AuthController],
// })
// export class AuthModule {}

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Module({
  imports: [
    UserModule,
    passportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.config.SECRET_KEY
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [ConfigService, AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [passportModule]
})
export class AuthModule {}