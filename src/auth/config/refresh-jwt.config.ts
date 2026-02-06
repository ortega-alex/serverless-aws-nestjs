import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import { JwtExpiresInFormat } from '../types/auth-jwt';

export default registerAs(
    'refresh-jwt',
    (): JwtSignOptions => ({
        secret: process.env.REFRESH_JWT_SECRET,
        expiresIn: (process.env.REFRESH_JWT_EXPIRES_IN ||
            '1h') as JwtExpiresInFormat
    })
);
