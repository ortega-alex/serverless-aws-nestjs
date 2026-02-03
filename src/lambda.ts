import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { APIGatewayProxyEvent, Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';

let cachedServer: Handler;

async function bootstrap(): Promise<Handler> {
    const app = await NestFactory.create(AppModule);
    await app.init();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return serverlessExpress({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        app: app.getHttpAdapter().getInstance()
    });
}

export const handler: Handler = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: Callback
) => {
    cachedServer = cachedServer ?? (await bootstrap());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return cachedServer(event, context, callback);
};
