import { ReviewsController } from './adapter/controllers/reviews.controller';
import { LoadReviewsService } from './application/services/load-reviews.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '../config/configuration';
import { ReviewsMongooseRepository } from './adapter/repository/reviews-mongoose.repository';
import { ReviewsDadaoRepository } from './adapter/repository/reviews-dadao.repository';
import { Review, ReviewsSchema } from './domain/schemas/review.schema';
import { HttpModule } from '@nestjs/axios';
import { GetReviewsService } from './application/services/get-reviews.service';
import { ReviewsModule } from './adapter/modules/reviews.module';
import { LoaderModule } from './adapter/modules/loader.module';

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
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
