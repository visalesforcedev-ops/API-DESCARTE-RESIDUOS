import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PontosDescarteModule } from './pontos-descarte/pontos-descarte.module';
import { DescartesModule } from './descartes/descartes.module';
import { RelatorioModule } from './relatorio/relatorio.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Vi09854580:Vi09854580@cluster0.v9cnecm.mongodb.net/?appName=Cluster0',
    ),
    PontosDescarteModule,
    DescartesModule,
    RelatorioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
