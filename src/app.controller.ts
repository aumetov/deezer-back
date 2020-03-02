import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { DeezerService } from './services/deezerService';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly deezerService: DeezerService
    ) {}

  @Get()
  async getHello(@Query('q') names) {
    try {
      const artist: number = await this.deezerService.findArtist(names.split('%20'));
      if (artist === 0) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return this.deezerService.findTopByArtis(artist);
    } catch(err) {
      throw new HttpException('Failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
}
