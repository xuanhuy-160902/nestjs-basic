import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, mongo } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  create(createCompanyDto: CreateCompanyDto, user: IUser) {
    return this.companyModel.create({
      ...createCompanyDto,
      createdBy: {
        _id: new mongo.ObjectId(user._id),
        email: user.email,
      },
    });
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: string) {
    if (!isValidObjectId(id)) return `company not found`;
    return this.companyModel.findOne({ _id: id });
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    if (!isValidObjectId(id)) return `company not found`;
    return this.companyModel.updateOne(
      { _id: id },
      {
        ...updateCompanyDto,
        updatedBy: {
          _id: new mongo.ObjectId(user._id),
          email: user.email,
        },
      },
    );
  }

  remove(id: string) {
    if (!isValidObjectId(id)) return `company not found`;
    return this.companyModel.softDelete({ _id: id });
  }
}
