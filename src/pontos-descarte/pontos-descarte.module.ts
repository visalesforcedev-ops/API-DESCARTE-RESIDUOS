import { Module } from '@nestjs/common';
import { PontosDescarteController } from './pontos-descarte.controller';
import { PontosDescarteService } from './pontos-descarte.service';

@Module({
  controllers: [PontosDescarteController],
  providers: [PontosDescarteService],
  exports: [PontosDescarteService],
})
export class PontosDescarteModule {}
