import { CustomErrorException } from '@devseeder/microservices-exceptions';
import { AbstractService } from '@devseeder/nestjs-microservices-commons';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export abstract class HttpClientService extends AbstractService {
  protected headersRequest: any;

  constructor(
    protected readonly url: string,
    protected readonly httpService: HttpService
  ) {
    super();
  }

  protected getHeaders() {
    return {
      'Content-Type': 'application/json'
    };
  }

  async get(endpoint: string): Promise<any> {
    try {
      console.log(`${this.url}${endpoint}`);
      console.log({
        headers: this.getHeaders()
      });
      const response = await firstValueFrom(
        await this.httpService.get(`${this.url}${endpoint}`, {
          headers: this.getHeaders()
        })
      );
      this.validateResponseStatus(response.data, response.status);
      return response.data;
    } catch (err) {
      throw new CustomErrorException(
        err.response.data.message,
        err.response.data.status,
        err.response.data.errorCode
      );
    }
  }

  protected validateResponseStatus(data: any, status: HttpStatus): boolean {
    switch (status) {
      case HttpStatus.ACCEPTED:
      case HttpStatus.CREATED:
      case HttpStatus.OK:
      case HttpStatus.NO_CONTENT:
      case HttpStatus.OK:
        return true;

      default:
        throw new HttpException(data, status);
    }
  }
}
