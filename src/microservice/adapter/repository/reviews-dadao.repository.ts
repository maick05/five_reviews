import { Inject, Injectable } from '@nestjs/common';
import { HttpClientService } from '../outputs/client/http-client.service';
import { HttpService } from '@nestjs/axios';
import { DadaoReview } from '../../../../src/microservice/domain/responses/get-all-dadao-reviews.response';
import {
  DadaoListResponse,
  DadaoResponse
} from 'src/microservice/domain/responses/dadao.response';
import { DadaoProduct } from 'src/microservice/domain/responses/search-dadao-product.response';
import { DadaoSQA } from 'src/microservice/domain/responses/get-all-dadao-sqa.response';

@Injectable()
export class ReviewsDadaoRepository extends HttpClientService {
  private cookie: string;

  constructor(
    @Inject(HttpService)
    protected readonly httpService: HttpService
  ) {
    super('https://order.sp.dadaowl.com', httpService);
  }

  async getAllReviews(
    cookie: string
  ): Promise<DadaoListResponse<DadaoReview[]>> {
    this.setCookie(cookie);

    const result = await this.get(
      '/goods-comment/list?currentPage=1&pageSize=1000'
    );
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

  async getAllSQA(cookie: string): Promise<DadaoListResponse<DadaoSQA[]>> {
    this.setCookie(cookie);

    const result = await this.get(
      '/shop-question-answer/list?currentPage=1&pageSize=1000'
    );
    return result['data'];
  }

  protected getHeaders() {
    return {
      ...super.getHeaders(),
      Cookie: this.cookie
    };
  }

  setCookie(cookie: string) {
    this.cookie = cookie;
  }
}
