import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import type { ObjectId } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get()
    finAll() {
        return this.service.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() data: CreateUserDto) {
        return this.service.create(data);
    }

    @Get(':id')
    findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
        return this.service.findOne(id);
    }
}
