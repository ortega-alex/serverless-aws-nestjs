import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('mongo-test')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get()
    test() {
        return this.service.findAll();
    }
}
