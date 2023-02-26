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
import { GetProductService } from 'src/microservice/application/services/get-product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductsSchema }])
  ],
  controllers: [],
  providers: [
    SaveProductService,
    GetProductService,
    ProductsMongooseRepository
  ],
  exports: [SaveProductService, GetProductService, ProductsMongooseRepository]
})
export class ProductsModule {}
