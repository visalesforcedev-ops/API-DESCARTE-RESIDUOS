import { Module } from '@nestjs/common';
import { PontosDescarteController } from './pontos-descarte.controller';
import { PontosDescarteService } from './pontos-descarte.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PontoDescarte,
  PontoDescarteSchema,
} from 'src/schemas/ponto-descarte.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PontoDescarte.name, schema: PontoDescarteSchema },
    ]),
  ],
  controllers: [PontosDescarteController],
  providers: [PontosDescarteService],
  exports: [PontosDescarteService],
})
export class PontosDescarteModule {}
