import { Injectable } from '@nestjs/common';
import { ReviewsDadaoRepository } from '../../adapter/repository/reviews-dadao.repository';
import { DadaoReview } from '../../../../src/microservice/domain/responses/get-all-dadao-reviews.response';
import { ReviewsMongooseRepository } from '../../adapter/repository/mongoose/reviews-mongoose.repository';
import { Review } from '../../domain/schemas/review.schema';
import { DadaoProduct } from '../../domain/responses/search-dadao-product.response';
import { SaveProductService } from './save-product.service';
import { Product } from 'src/microservice/domain/schemas/product.schema';

@Injectable()
export class LoadReviewsService {
  constructor(
    private readonly reviewsDadaoRepository: ReviewsDadaoRepository,
    private readonly reviewsMongooseRepository: ReviewsMongooseRepository,
    private readonly saveProductService: SaveProductService
  ) {}

  async loadReviews(cookie: string): Promise<any> {
    const dadaoData = await this.reviewsDadaoRepository.getAllReviews(cookie);
    // await this.clearReviews();
    await this.saveReviews(dadaoData.dataList);
    return dadaoData;
  }

  async clearReviews(): Promise<void> {
    await this.reviewsMongooseRepository.removeAll();
  }

  async saveReviews(dadaoData: DadaoReview[]) {
    const arrProducts = [];
    for await (const item of dadaoData) {
      const reviewInDB = await this.reviewsMongooseRepository.find({
        commentId: item.commentId
      });

      if (reviewInDB.length > 0) {
        continue;
      }

      const productsDB = arrProducts.filter(
        (prd: Product) =>
          prd.title === item.goods_title && prd.status == 'active'
      );

      console.log('productsDB.length --> ' + productsDB.length);

      let productDB = new Product();

      if (productsDB.length === 0) {
        const product = await this.searchProduct(item.goods_title);
        productDB = await this.saveProductService.saveProduct(product);
        arrProducts.push(productDB);
      } else {
        productDB = productsDB[0];
      }

      const rev = new Review();
      rev.active = true;
      rev.additional_url = item.additional_url;
      rev.area = item.area;
      rev.commentId = item.commentId.toString();
      rev.commentTitle = item.commentTitle;
      rev.content = item.content;
      rev.create_time = item.create_time;
      rev.email = item.email;
      rev.featured = item.featured;
      rev.goods_title = item.goods_title;
      rev.nick = item.nick;
      rev.platform = item.platform;
      rev.replay_content = item.replay_content;
      rev.star = item.star;
      rev.status = item.status;
      rev.productId = productDB.id;
      rev.shopId = 61312729228;
      await console.log(rev.commentId);
      await this.reviewsMongooseRepository.insertOne(rev, rev.goods_title);
    }
  }

  async searchProduct(name: string): Promise<DadaoProduct> {
    let product = await this.reviewsDadaoRepository.searchProductByName(
      name,
      'active'
    );

    if (product.dataList.length > 1) {
      console.log(
        product.dataList.map((item) => {
          item.goodsId, item.goodsTitle;
        })
      );
      throw new Error('Encontrado dois produtos para o mesmo nome!');
    }

    console.log('name ---> ' + name);

    if (product.dataList.length == 0) {
      console.log('Nenhum produto ativo encontrado com esse nome ---> ' + name);
      product = await this.reviewsDadaoRepository.searchProductByName(
        name,
        'draft'
      );

      if (product.dataList.length == 0)
        throw new Error('Nenhum produto encontrado com esse nome em rascunho');
    }

    return product.dataList[0];
  }
}
