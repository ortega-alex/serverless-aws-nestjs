import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: config => {
                if (!config.DB_HOST) throw new Error('DB_HOST is required');
                if (!config.DB_PASSWORD)
                    throw new Error('DB_PASSWORD is required');
                return config;
            }
        })
    ],
    controllers: [AppController, HealthController],
    providers: [AppService]
})
export class AppModule {}
