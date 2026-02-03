import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login() {
        return this.authService.login();
    }

    @UseGuards(JwtAuthGuard)
    @Get('secure')
    test(@Req() req) {
        return {
            message: 'Access granted',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            user: req.user
        };
    }
}
