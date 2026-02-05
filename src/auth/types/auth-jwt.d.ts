export type JwtExpiresInFormat = '1h' | '1d' | '1w' | '1M' | '1y';

export type AuthJwtPayload = {
    sub: string;
};
