import { LoadReviewsService } from '../../application/services/load-reviews.service';
import { Module } from '@nestjs/common';
import { ReviewsDadaoRepository } from '../../adapter/repository/reviews-dadao.repository';
import { HttpModule } from '@nestjs/axios';
import { LoaderController } from '../controllers/loader.controller';
import { ReviewsModule } from './reviews.module';
import { ProductsModule } from './products.module';

@Module({
  imports: [HttpModule, ReviewsModule, ProductsModule],
  controllers: [LoaderController],
  providers: [LoadReviewsService, ReviewsDadaoRepository]
})
export class LoaderModule {}
