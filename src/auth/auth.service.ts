import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/users/user.service';
import refreshJwtConfig from './config/refresh-jwt.config';
import { AuthJwtPayload } from './types/auth-jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        @Inject(refreshJwtConfig.KEY)
        private readonly refreshJwtServiceConfiguration: ConfigType<
            typeof refreshJwtConfig
        >
    ) {}

    login(sub: string) {
        const payload: AuthJwtPayload = { sub };
        const access_token = this.jwtService.sign(payload);
        const refresh_token = this.jwtService.sign(
            payload,
            this.refreshJwtServiceConfiguration
        );
        return {
            access_token,
            refresh_token
        };
    }

    refreshToken(sub: string) {
        const payload: AuthJwtPayload = { sub };
        const access_token = this.jwtService.sign(payload);
        return {
            id: sub,
            access_token
        };
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.getByEmail(email);
        if (!user) throw new UnauthorizedException();
        const isValid = await compare(password, user.password);
        if (!isValid) throw new UnauthorizedException("Password doesn't match");
        return { id: user._id };
    }
}
