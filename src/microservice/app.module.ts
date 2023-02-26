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
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewsSchema }]),
    HttpModule
  ],
  controllers: [ReviewsController],
  providers: [
    LoadReviewsService,
    GetReviewsService,
    ReviewsMongooseRepository,
    ReviewsDadaoRepository
  ]
})
export class AppModule {}
