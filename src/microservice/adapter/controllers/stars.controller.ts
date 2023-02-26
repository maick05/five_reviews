import { Controller, Get, Param } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { GetStarsService } from 'src/microservice/application/services/get-stars.service';
import { ProductOverviewData } from 'src/microservice/domain/dto/product-overview.dto';
import { DadaoResponse } from 'src/microservice/domain/responses/dadao.response';
import { GetDadaoStarsResponse } from 'src/microservice/domain/responses/get-dadao-stars.response';

@Controller()
export class StarsController {
  constructor(private readonly getStarsService: GetStarsService) {}

  @Get('/stars/:id/')
  async getStarsByProductId(
    @Param('id') id: number
  ): Promise<DadaoResponse<GetDadaoStarsResponse>> {
    return await this.getStarsService.getStars(id);
  }

  @Get('/overview/:id/')
  async getOverviewByProductId(
    @Param('id') id: number
  ): Promise<DadaoResponse<ProductOverviewData>> {
    return await this.getStarsService.getOverview(id);
  }

  @Post('/overview/')
  async getOverviewByProductIds(
    @Body() ids: { goodsIds: string }
  ): Promise<DadaoResponse<ProductOverviewData[]>> {
    return await this.getStarsService.getOverviewByProductIds(ids);
  }
}
