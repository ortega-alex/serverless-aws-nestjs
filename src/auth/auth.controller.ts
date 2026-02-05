import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Req() req) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const id: string = req.user.mongo_id as string;

        const access_token = this.authService.login(id);
        return {
            id,
            access_token
        };
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
