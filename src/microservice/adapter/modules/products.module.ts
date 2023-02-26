import { ReviewsController } from '../controllers/reviews.controller';
import { LoadReviewsService } from '../../application/services/load-reviews.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '../../../config/configuration';
import { ReviewsMongooseRepository } from '../repository/mongoose/reviews-mongoose.repository';
import { ReviewsDadaoRepository } from '../repository/reviews-dadao.repository';
import {
  Product,
  ProductsSchema
} from 'src/microservice/domain/schemas/product.schema';
import { SaveProductService } from 'src/microservice/application/services/save-product.service';
import { ProductsMongooseRepository } from '../repository/mongoose/products-mongoose.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductsSchema }])
  ],
  controllers: [],
  providers: [SaveProductService, ProductsMongooseRepository],
  exports: [SaveProductService, ProductsMongooseRepository]
})
export class ProductsModule {}
