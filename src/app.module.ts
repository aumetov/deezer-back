import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeezerService } from './services/deezerService';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, DeezerService],
})
export class AppModule {}
