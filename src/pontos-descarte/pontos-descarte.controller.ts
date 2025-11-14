import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PontosDescarteService } from './pontos-descarte.service';
import { CreatePontoDto } from '../dtos/create-ponto.dto';

@Controller('pontos-descarte')
export class PontosDescarteController {
  constructor(private readonly pontosService: PontosDescarteService) {}

  @Post()
  create(@Body() pontoDto: CreatePontoDto) {
    return this.pontosService.create(pontoDto);
  }

  @Get()
  findAll() {
    return this.pontosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pontosService.findOne(id);
  }
}
