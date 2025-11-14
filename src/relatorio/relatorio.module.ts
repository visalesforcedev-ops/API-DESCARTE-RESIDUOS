import { Module } from '@nestjs/common';
import { RelatorioController } from './relatorio.controller';
import { RelatorioService } from './relatorio.service';
import { PontosDescarteModule } from '../pontos-descarte/pontos-descarte.module';
import { DescartesModule } from '../descartes/descartes.module';

@Module({
  imports: [PontosDescarteModule, DescartesModule],
  controllers: [RelatorioController],
  providers: [RelatorioService],
})
export class RelatorioModule {}
