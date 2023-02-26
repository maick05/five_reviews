import { Controller, Get, Param } from '@nestjs/common';
import { GetSettingsService } from 'src/microservice/application/services/get-settings.service';

@Controller()
export class SettingsController {
  constructor(private readonly getSettingsService: GetSettingsService) {}

  @Get('/settings')
  async getSettings(): Promise<any> {
    return await this.getSettingsService.getSettings();
  }
}