import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt.guard';
import type { RequestWithUser } from './types/auth-jwt';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Req() req: RequestWithUser) {
        const id: string = req.user.id;
        const { access_token, refresh_token } = this.authService.login(id);
        return {
            id,
            access_token,
            refresh_token
        };
    }

    @Post('refresh')
    @UseGuards(RefreshJwtAuthGuard)
    refresh(@Req() req: RequestWithUser) {
        const id: string = req.user.id;
        return this.authService.refreshToken(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('secure')
    test(@Req() req: RequestWithUser) {
        return {
            message: 'Access granted',
            id: req.user.id
        };
    }
}
