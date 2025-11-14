import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PontosDescarteModule } from './pontos-descarte/pontos-descarte.module';
import { DescartesModule } from './descartes/descartes.module';
import { RelatorioModule } from './relatorio/relatorio.module';

@Module({
  imports: [PontosDescarteModule, DescartesModule, RelatorioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
