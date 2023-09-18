import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { isValidObjectId } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: SoftDeleteModel<UserDocument>,
  ) {}
  x;
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  getPasswordHash(password: string) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  checkUserPassword(password: string, pwHash: string) {
    return compareSync(password, pwHash);
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = this.getPasswordHash(createUserDto.password);
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) return `user not found`;
    return await this.userModel.findOne({
      _id: id,
    });
  }

  async findOneByUsername(username: string) {
    return await this.userModel.findOne({
      email: username,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) return `user not found`;
    const result = await this.userModel.updateOne({ _id: id }, updateUserDto);
    return result;
  }

  remove(id: string) {
    if (!isValidObjectId(id)) return `user not found`;
    return this.userModel.softDelete({
      _id: id,
    });
  }
}
