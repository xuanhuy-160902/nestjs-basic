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

  create(createUserDto: CreateUserDto) {
    const password = createUserDto.password;
    const passwordHash = this.getPasswordHash(password);
    createUserDto.password = passwordHash;
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if (!isValidObjectId(id)) return `user not found`;
    return this.userModel.findOne({ _id: id });
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({ email: username });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) return `user not found`;
    return this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  remove(id: string) {
    if (!isValidObjectId(id)) return `user not found`;
    return this.userModel.softDelete({ _id: id });
  }
}
