import { Inject, Injectable } from '@nestjs/common';
import { HttpClientService } from '../outputs/client/http-client.service';
import { HttpService } from '@nestjs/axios';
import { DadaoReview } from '../../../../src/microservice/domain/responses/get-all-dadao-reviews.response';
import {
  DadaoListResponse,
  DadaoResponse
} from 'src/microservice/domain/responses/dadao.response';
import { DadaoProduct } from 'src/microservice/domain/responses/search-dadao-product.response';

@Injectable()
export class ReviewsDadaoRepository extends HttpClientService {
  constructor(
    @Inject(HttpService)
    protected readonly httpService: HttpService
  ) {
    super('https://order.sp.dadaowl.com', httpService);
  }

  async getAllReviews(): Promise<DadaoListResponse<DadaoReview[]>> {
    
    const result = await this.get(
      '/goods-comment/list?currentPage=1&pageSize=1000'
    );
    console.log(result);
    return result['data'];
  }

  async searchProductByName(
    name: string,
    status: string
  ): Promise<DadaoListResponse<DadaoProduct[]>> {
    const result = await this.get(
      `/shopProduct/page?currentPage=1&pageSize=10&productName=${name}&goodsStatus=${status}`
    );
    return result['data'];
  }

  protected getHeaders() {
    return {
      ...super.getHeaders(),
      Cookie:
        'STORE_SHOP_INFO={%22userId%22:%2261312729228%22%2C%22firstName%22:null%2C%22lastName%22:null%2C%22hasReview%22:true%2C%22insUsername%22:%22%22%2C%22isRelatedIns%22:false%2C%22shopUrl%22:%22https://f6bb5f.myshopify.com%22}; SESSION=NGUyM2I2ZmEtYTE5OC00NjllLTkxMDItN2M4NGJiZGQyYTQ2; crisp-client%2Fsession%2Fce7cf425-0b66-4801-beba-cb5a19592d3e=session_71fa3013-c3ff-47fc-beac-7c6e21e0b975'
    };
  }
}
