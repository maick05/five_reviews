import { Inject, Injectable } from '@nestjs/common';
import { HttpClientService } from '../outputs/client/http-client.service';
import { HttpService } from '@nestjs/axios';
import { GetAllDadaoReviewsResponse } from '../../../../src/microservice/domain/responses/get-all-dadao-reviews.response';

@Injectable()
export class ReviewsDadaoRepository extends HttpClientService {
  constructor(
    @Inject(HttpService)
    protected readonly httpService: HttpService
  ) {
    super('https://order.sp.dadaowl.com', httpService);
  }

  async getAllReviews(): Promise<GetAllDadaoReviewsResponse> {
    const result = await this.get(
      '/goods-comment/list?currentPage=1&pageSize=1000'
    );
    console.log(result);
    console.log(result['data']);
    return result['data'];
  }

  protected getHeaders() {
    return {
      ...super.getHeaders(),
      Cookie: encodeURI(
        'SESSION=YWE3ZWIwY2ItZmNhZi00MWEyLTkzZTgtMTY5M2VhOTI1NWYy; STORE_SHOP_INFO={%22userId%22:%2261312729228%22%2C%22firstName%22:null%2C%22lastName%22:null%2C%22hasReview%22:true%2C%22insUsername%22:%22%22%2C%22isRelatedIns%22:false%2C%22shopUrl%22:%22https://f6bb5f.myshopify.com%22}; crisp-client%2Fsession%2Fce7cf425-0b66-4801-beba-cb5a19592d3e=session_0273ad8a-2fc8-494e-b1dd-06dd256490b9'
        // 'SESSION=SESSION=YWE3ZWIwY2ItZmNhZi00MWEyLTkzZTgtMTY5M2VhOTI1NWYy;STORE_SHOP_INFO={"userId":"61312729228","firstName":null,"lastName":null,"hasReview":true,"insUsername":"","isRelatedIns":false,"shopUrl":"https://f6bb5f.myshopify.com"};crisp-client/session/ce7cf425-0b66-4801-beba-cb5a19592d3e=session_0273ad8a-2fc8-494e-b1dd-06dd256490b9'
      )
    };
  }
}
