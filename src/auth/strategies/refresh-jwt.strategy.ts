import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { AuthJwtPayload } from '../types/auth-jwt';

@Injectable()
export class RefreshJwtEstrategy extends PassportStrategy(
    Strategy,
    'refresh-jwt'
) {
    constructor(
        @Inject(refreshJwtConfig.KEY)
        private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refreshJwtConfiguration.secret as string,
            ignoreExpiration: false
        });
    }

    validate(payload: AuthJwtPayload) {
        const id = payload.sub;
        return { id };
    }
}
