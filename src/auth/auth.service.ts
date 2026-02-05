import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    login() {
        const payload: AuthJwtPayload = { sub: 'mongodb_id' };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
