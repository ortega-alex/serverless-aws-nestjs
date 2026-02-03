// import 'dotenv/config';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
    imports: [
        MongooseModule.forRoot(
            process.env.MONGO_URI || 'mongodb://localhost:27017/nest'
        )
    ],
    exports: [MongooseModule]
})
export class MongoModule {}
