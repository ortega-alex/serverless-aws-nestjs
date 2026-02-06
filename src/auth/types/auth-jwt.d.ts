import { Request } from 'express';

export type JwtExpiresInFormat = '60s' | '1h' | '1d' | '1w' | '1M' | '1y';

export type AuthJwtPayload = {
    sub: string;
};

export interface RequestWithUser extends Request {
    user: {
        id: string;
    };
}
