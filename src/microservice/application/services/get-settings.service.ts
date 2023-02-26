import { Injectable } from '@nestjs/common';
import { SettingsMongooseRepository } from 'src/microservice/adapter/repository/mongoose/settings-mongoose.repository';
import { DadaoResponse } from 'src/microservice/domain/responses/dadao.response';
import { Setting } from 'src/microservice/domain/schemas/setting.schema';

@Injectable()
export class GetSettingsService {
  constructor(
    private readonly mongooseRepository: SettingsMongooseRepository
  ) {}

  async getSettings(): Promise<DadaoResponse<Setting[]>> {
    const data = await this.mongooseRepository.find({});

    return {
      code: 200,
      column: null,
      msg: 'Successful operation',
      data: data,
      otherData: 'Loja Five'
    };
  }
}
