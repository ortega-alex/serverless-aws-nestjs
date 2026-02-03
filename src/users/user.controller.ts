import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Controller('mongo-test')
export class UserController {
    constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

    @Get()
    test() {
        return this.model.find().limit(1);
    }
}
