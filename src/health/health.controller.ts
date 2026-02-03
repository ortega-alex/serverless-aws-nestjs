import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    health() {
        return { status: 'ok', lambda: true };
    }

    @Get('env')
    env() {
        return {
            nodeEnv: process.env.NODE_ENV,
            appName: process.env.APP_NAME,
            logLevel: process.env.LOG_LEVEL,
            dbHost: process.env.DB_HOST,
            dbName: process.env.DB_NAME
        };
    }
}
