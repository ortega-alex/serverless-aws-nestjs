import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './schemas/user.schema';
// import bcript from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

    async findAll() {
        return this.model.find({}, { password: false });
    }

    async create(data: CreateUserDto) {
        return this.model.create(data);
    }

    async findOne(id: ObjectId) {
        return this.model.findOne({ _id: id }, { password: false });
    }

    async update(id: string, user: UpdateUserDto) {
        return this.model.updateOne({ _id: id }, user);
    }

    async delete(id: string) {
        return this.model.deleteOne({ _id: id });
    }

    getByEmail(email: string) {
        return this.model.findOne({ email });
    }
}
