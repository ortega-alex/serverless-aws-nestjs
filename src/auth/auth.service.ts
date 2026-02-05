import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/users/user.service';
import { AuthJwtPayload } from './types/auth-jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {}

    login(sub: string) {
        const payload: AuthJwtPayload = { sub };
        return this.jwtService.sign(payload);
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.getByEmail(email);
        if (!user) throw new UnauthorizedException();
        const isValid = await compare(password, user.password);
        if (!isValid) throw new UnauthorizedException("Password doesn't match");
        return {
            mongo_id: user._id
        };
    }
}
