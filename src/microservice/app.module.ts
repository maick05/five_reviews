import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '../config/configuration';
import { ReviewsModule } from './adapter/modules/reviews.module';
import { LoaderModule } from './adapter/modules/loader.module';
import { SettingssModule as SettingsModule } from './adapter/modules/settings.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('database.mongodb.connection')
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    ReviewsModule,
    LoaderModule,
    SettingsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
