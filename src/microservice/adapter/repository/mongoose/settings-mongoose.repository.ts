import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepository } from '@devseeder/nestjs-microservices-commons';
import {
  Setting,
  SettingDocument
} from 'src/microservice/domain/schemas/setting.schema';

@Injectable()
export class SettingsMongooseRepository extends MongooseRepository<
  Setting,
  SettingDocument
> {
  constructor(
    @InjectModel(Setting.name)
    model: Model<SettingDocument>
  ) {
    super(model);
  }
}
