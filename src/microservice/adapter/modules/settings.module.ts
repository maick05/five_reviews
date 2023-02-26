import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Setting,
  SettingSchema
} from 'src/microservice/domain/schemas/setting.schema';
import { GetSettingsService } from 'src/microservice/application/services/get-settings.service';
import { SettingsMongooseRepository } from '../repository/mongoose/settings-mongoose.repository';
import { SettingsController } from '../controllers/settings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }])
  ],
  controllers: [SettingsController],
  providers: [GetSettingsService, SettingsMongooseRepository],
  exports: [GetSettingsService, SettingsMongooseRepository]
})
export class SettingssModule {}
