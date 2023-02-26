import { Injectable } from '@nestjs/common';
import { ProductsMongooseRepository } from 'src/microservice/adapter/repository/mongoose/products-mongoose.repository';
import { DadaoProduct } from 'src/microservice/domain/responses/search-dadao-product.response';
import { Product } from 'src/microservice/domain/schemas/product.schema';

@Injectable()
export class SaveProductService {
  constructor(
    private readonly mongooseRepository: ProductsMongooseRepository
  ) {}

  async saveProduct(dadaoData: DadaoProduct) {
    const productDb = await this.mongooseRepository.find({
      id: dadaoData.goodsId
    });

    if (productDb.length > 0) return productDb[0];

    const product = new Product();
    product.id = dadaoData.goodsId;
    product.title = dadaoData.goodsTitle;
    product.images = dadaoData.images;
    product.avgStar = dadaoData.avgStar;
    product.handle = dadaoData.handle;
    product.status = dadaoData.goodsStatus;
    product.shopId = 61312729228;
    await this.mongooseRepository.insertOne(product, product.title);

    return product;
  }
}
