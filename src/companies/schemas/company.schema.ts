import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop({ type: Object })
  createdBy: {
    _id: ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: ObjectId;
    email: string;
  };
  @Prop({ type: Object })
  deletedBy: {
    _id: ObjectId;
    email: string;
  };
}

export const CompanyScheme = SchemaFactory.createForClass(Company);
