import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './database/mongo/mongo.module';
import { HealthController } from './health/health.controller';
import { UserModule } from './users/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: config => {
                if (!config.DB_HOST) throw new Error('DB_HOST is required');
                if (!config.DB_PASSWORD)
                    throw new Error('DB_PASSWORD is required');
                if (!config.MONGO_URI) throw new Error('MONGO_URI is required');
                return config;
            }
        }),
        MongoModule,
        UserModule
    ],
    controllers: [AppController, HealthController],
    providers: [AppService]
})
export class AppModule {}
