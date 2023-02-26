import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepository } from '@devseeder/nestjs-microservices-commons';
import { Product, ProductDocument } from 'src/microservice/domain/schemas/product.schema';

@Injectable()
export class ProductsMongooseRepository extends MongooseRepository<
  Product,
  ProductDocument
> {
  constructor(
    @InjectModel(Product.name)
    model: Model<ProductDocument>
  ) {
    super(model);
  }
}
