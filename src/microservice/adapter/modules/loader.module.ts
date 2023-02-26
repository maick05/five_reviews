import { LoadReviewsService } from '../../application/services/load-reviews.service';
import { Module } from '@nestjs/common';
import { ReviewsDadaoRepository } from '../../adapter/repository/reviews-dadao.repository';
import { HttpModule } from '@nestjs/axios';
import { LoaderController } from '../controllers/loader.controller';
import { ReviewsModule } from './reviews.module';
import { ProductsModule } from './products.module';
import { LoadProductsQuestionsAnswersService } from 'src/microservice/application/services/load-products-questions-answers.service';
import { PQAModule } from './pqa.module';

@Module({
  imports: [HttpModule, ReviewsModule, ProductsModule, PQAModule],
  controllers: [LoaderController],
  providers: [
    LoadReviewsService,
    LoadProductsQuestionsAnswersService,
    ReviewsDadaoRepository
  ]
})
export class LoaderModule {}
