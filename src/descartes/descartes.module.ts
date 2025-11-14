import { Module } from '@nestjs/common';
import { DescartesController } from './descartes.controller';
import { DescartesService } from './descartes.service';
import { Descarte, DescarteSchema } from 'src/schemas/descarte-ponto-schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Descarte.name, schema: DescarteSchema },
    ]),
  ],
  controllers: [DescartesController],
  providers: [DescartesService],
  exports: [DescartesService],
})
export class DescartesModule {}
