import { Controller, Get, Param } from '@nestjs/common';
import { GetPQAService } from 'src/microservice/application/services/get-pqa.service';
import { PQAObjectDTO } from 'src/microservice/domain/dto/pqa.dto';
import {
  DadaoListResponse,
  DadaoResponse
} from 'src/microservice/domain/responses/dadao.response';

@Controller()
export class PQAController {
  constructor(private readonly getPQAService: GetPQAService) {}

  @Get('/pqa/:id/:page')
  async getReviewsByProductId(
    @Param('id') id: number,
    @Param('page') page: number
  ): Promise<DadaoResponse<DadaoListResponse<PQAObjectDTO[]>>> {
    return await this.getPQAService.getPQAByProductId(id, page);
  }
}
