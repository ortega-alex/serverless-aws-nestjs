import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    login() {
        const payload = { username: 'nest-user' };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
