import { Injectable } from '@nestjs/common';
import { ProductsMongooseRepository } from 'src/microservice/adapter/repository/mongoose/products-mongoose.repository';
import { DadaoProduct } from 'src/microservice/domain/responses/search-dadao-product.response';
import { Product } from 'src/microservice/domain/schemas/product.schema';

@Injectable()
export class GetProductService {
  constructor(
    private readonly mongooseRepository: ProductsMongooseRepository
  ) {}

  async getProduct(id: number): Promise<Product> {
    return (await this.mongooseRepository.find({ id }))[0];
  }
}
