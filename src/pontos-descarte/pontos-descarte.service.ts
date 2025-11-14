import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePontoDto } from '../dtos/create-ponto.dto';
import {
  PontoDescarte,
  PontoDescarteDocument,
} from 'src/schemas/ponto-descarte.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PontosDescarteService {
  constructor(
    @InjectModel(PontoDescarte.name)
    private pontoModel: Model<PontoDescarteDocument>,
  ) {}

  async create(pontoDto: CreatePontoDto): Promise<PontoDescarte> {
    const novoPonto = new this.pontoModel(pontoDto);
    return novoPonto.save();
  }

  async findAll(): Promise<PontoDescarte[]> {
    return this.pontoModel.find().exec();
  }

  async findOne(id: number): Promise<PontoDescarte> {
    const ponto = await this.pontoModel.findById(id).exec();
    if (!ponto) {
      throw new NotFoundException(`Ponto com ID ${id} não encontrado.`);
    }
    return ponto;
  }
}
