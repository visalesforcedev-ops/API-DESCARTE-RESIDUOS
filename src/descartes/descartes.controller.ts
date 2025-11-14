import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import * as descartesService_1 from './descartes.service';
import { CreateDescarteDto } from '../dtos/create-descarte.dto';

@Controller('descartes')
export class DescartesController {
  constructor(
    private readonly descartesService: descartesService_1.DescartesService,
  ) {}

  @Post()
  create(@Body() descarteDto: CreateDescarteDto) {
    return this.descartesService.create(descarteDto);
  }

  @Get()
  findAll(@Query() filtros: descartesService_1.FiltrosConsulta) {
    return this.descartesService.findAll(filtros);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.descartesService.findOne(id);
  }
}
