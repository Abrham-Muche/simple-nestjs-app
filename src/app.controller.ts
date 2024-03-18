import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('FansCRM')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'FanCRM backend health check' })
  @ApiResponse({
    type: Boolean,
    status: 200,
  })
  healthCheck(): boolean {
    return this.appService.healthCheck();
  }
}
