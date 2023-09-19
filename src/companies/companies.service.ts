import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyModel.create(createCompanyDto);
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: string) {
    if (!isValidObjectId(id)) return `company not found`;
    return this.companyModel.findOne({ _id: id });
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    if (!isValidObjectId(id)) return `company not found`;
    return this.companyModel.updateOne({ _id: id }, updateCompanyDto);
  }

  remove(id: string) {
    if (!isValidObjectId(id)) return `company not found`;
    return this.companyModel.softDelete({ _id: id });
  }
}
