import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UserService } from 'src/users/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import jwtConfig from './config/jwt.config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshJwtEstrategy } from './strategies/refresh-jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync(jwtConfig.asProvider()),
        ConfigModule.forFeature(jwtConfig),
        ConfigModule.forFeature(refreshJwtConfig),
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ])
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserService,
        JwtStrategy,
        LocalStrategy,
        RefreshJwtEstrategy
    ],
    exports: [AuthService]
})
export class AuthModule {}
